import feedparser
import requests
import json
import re
import os
import smtplib
import argparse
import time
from bs4 import BeautifulSoup
import google.generativeai as genai
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from time import mktime

# --- CONFIGURATION: THE SOURCE TREE ---
MASTER_CONFIG = {
    "DEFENSE_SYSTEMS": {
        "UNMANNED_AUTONOMY": [
            {"name": "SHIELD_AI", "url": "https://shield.ai/feed/"},
            {"name": "C4ISRNET_UNMANNED", "url": "https://www.c4isrnet.com/arc/outboundfeeds/rss/category/unmanned/"}
        ],
        "GOVERNMENT_DECKS": [
            {"name": "DEFENSE_ONE_TECH", "url": "https://www.defenseone.com/rss/technology/"},
            {"name": "AF_TOP_STORIES", "url": "https://www.af.mil/DesktopModules/ArticleCS/RSS.ashx?PortalId=1&ModuleId=730&max=20"},
            {"name": "DEFENSE_NEWS", "url": "https://www.defensenews.com/arc/outboundfeeds/rss/"}
        ],
        "RESEARCH_LABS": [
            {"name": "MIT_LINCOLN_LAB", "url": "https://www.ll.mit.edu/news/rss.xml"},
            {"name": "ARXIV_AI_PAPERS", "url": "https://arxiv.org/rss/cs.AI"}
        ]
    },
    "AEROSPACE_COMMAND": {
        "ORBITAL_LOGISTICS": [
            {"name": "SPACE_NEWS", "url": "https://spacenews.com/feed/"},
            {"name": "NASA_BREAKING", "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss"}
        ],
        "DEFENSE_SPACE": [
            {"name": "BREAKING_DEFENSE_SPACE", "url": "https://breakingdefense.com/category/space/feed/"}
        ]
    },
    "CYBER_INTELLIGENCE": {
        "THREAT_ADVISORIES": [
            {"name": "CISA_ALERTS", "url": "https://www.cisa.gov/cybersecurity-advisories/all.xml"},
            {"name": "HACKER_NEWS_RAW", "url": "https://news.ycombinator.com/rss"}
        ],
        "EXPLOIT_TRACKERS": [
            {"name": "BLEEPING_COMPUTER", "url": "https://www.bleepingcomputer.com/feed/"},
            {"name": "KREBS_ON_SECURITY", "url": "https://krebsonsecurity.com/feed/"}
        ]
    }
}

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
}

def clean_summary(text):
    """Fallback cleaner if deep scrape or AI fails."""
    clean = re.sub(r'<[^>]+>', '', text)
    return clean[:400] + "..." if len(clean) > 400 else clean

def deep_scrape_article(url):
    """Visits the actual article URL and extracts paragraph text."""
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        for element in soup(["script", "style", "header", "footer", "nav", "aside"]):
            element.extract()
            
        paragraphs = soup.find_all('p')
        article_text = " ".join([p.get_text().strip() for p in paragraphs if len(p.get_text().strip()) > 40])
        
        if len(article_text) > 100:
            clean = re.sub(r'\s+', ' ', article_text)
            # Give the AI a solid chunk to read, up to 4000 chars
            return clean[:4000]
            
        return None
    except Exception as e:
        print(f"DEEP_SCRAPE_FAILED for {url}: {e}")
        return None

def summarize_with_ai(article_text):
    """Passes raw text to Gemini AI to generate an OSINT briefing format."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return None
        
    try:
        genai.configure(api_key=api_key)
        # Using the fast, efficient Flash model
        model = genai.GenerativeModel("gemini-2.5-flash") 
        
        prompt = f"""
        You are an elite OSINT (Open Source Intelligence) AI. 
        Read the following intercepted article text and summarize it.
        Format your response EXACTLY like this (use HTML formatting for the bold tags):
        
        <br><strong>STATUS:</strong> [1 sentence summarizing the core event]<br><br><strong>INTEL:</strong> [1 short paragraph providing the crucial context, strategic implications, or technical details]
        
        Article Text:
        {article_text}
        """
        
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"AI_DECRYPT_FAILED: {e}")
        return None

def dispatch_daily_brief(recent_articles):
    sender = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASS")
    receiver = os.environ.get("SMTP_TO")

    if not all([sender, password, receiver]):
        print("SYSTEM_WARNING: Missing SMTP credentials. Email aborted.")
        return

    if not recent_articles:
        print("NO_NEW_SIGNALS: Skipping email dispatch.")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"GHOST SIGNAL // Daily Intel Brief ({datetime.now().strftime('%Y.%m.%d')})"
    msg["From"] = sender
    msg["To"] = receiver

    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #111; color: #eee; padding: 20px;">
        <h2 style="color: #FF5500; border-bottom: 1px solid #FF5500; padding-bottom: 10px;">GHOST SIGNAL // 24-HOUR DECRYPT</h2>
        <p>The following high-priority signals were intercepted in the last 24 hours:</p>
    """

    for art in recent_articles:
        html_body += f"""
        <div style="margin-bottom: 25px; border-left: 3px solid #FF5500; padding-left: 15px;">
            <div style="font-size: 12px; color: #FF5500; font-weight: bold;">NODE: {art['feed_name']}</div>
            <div style="font-size: 16px; font-weight: bold; margin: 5px 0;">{art['title']}</div>
            <div style="font-size: 14px; color: #aaa; margin-bottom: 10px; line-height: 1.5;">{art['description']}</div>
            <a href="{art['source_url']}" style="color: #FF5500; text-decoration: none; font-size: 12px; border: 1px solid #FF5500; padding: 5px 10px; display: inline-block;">ACCESS RAW DATA</a>
        </div>
        """

    html_body += "</body></html>"
    msg.attach(MIMEText(html_body, "html"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender, password)
        server.sendmail(sender, receiver, msg.as_string())
        server.quit()
        print("UPLINK_SUCCESS: Daily Briefing Dispatched.")
    except Exception as e:
        print(f"MAILER_ERROR: {e}")

def fetch_all_signals(send_email=False):
    tree = {"industries": []}
    recent_articles = []
    time_limit = datetime.now() - timedelta(days=1)

    for ind_name, categories in MASTER_CONFIG.items():
        industry_node = {"name": ind_name, "categories": []}
        
        for cat_name, feeds in categories.items():
            category_node = {"name": cat_name, "feeds": []}
            
            for feed_info in feeds:
                print(f"POLLING_SOURCE: {feed_info['name']}...")
                try:
                    response = requests.get(feed_info['url'], headers=HEADERS, timeout=15)
                    response.raise_for_status()
                    
                    parsed = feedparser.parse(response.content)
                    feed_node = {"name": feed_info['name'], "articles": []}
                    
                    # Capped at 5 articles per feed to respect AI rate limits and execution time
                    for entry in parsed.entries[:5]:
                        date_val = datetime.now().strftime("%Y.%m.%d")
                        is_recent = False
                        
                        if hasattr(entry, 'published_parsed') and entry.published_parsed:
                            entry_dt = datetime.fromtimestamp(mktime(entry.published_parsed))
                            date_val = entry_dt.strftime("%Y.%m.%d")
                            if entry_dt >= time_limit:
                                is_recent = True
                        
                        # Step 1: Deep Scrape
                        deep_text = deep_scrape_article(entry.link)
                        
                        # Step 2: AI Decryption
                        final_desc = "NO_DESCRIPTION_AVAILABLE"
                        if deep_text and len(deep_text) > 200:
                            print(f" > INITIATING_AI_DECRYPT for: {entry.title[:30]}...")
                            ai_summary = summarize_with_ai(deep_text)
                            
                            if ai_summary:
                                final_desc = ai_summary
                                # CRITICAL: Throttle to respect the 15 RPM Free Tier Limit
                                time.sleep(4.2) 
                            else:
                                final_desc = clean_summary(deep_text)
                        else:
                            fallback_desc = entry.get('summary', entry.get('description', 'NO_DESCRIPTION_AVAILABLE'))
                            final_desc = clean_summary(fallback_desc)
                        
                        article_data = {
                            "id": f"GS-{hash(entry.link) % 100000}",
                            "title": entry.title.upper(),
                            "description": final_desc,
                            "source_url": entry.link,
                            "timestamp": date_val,
                            "feed_name": feed_info['name']
                        }
                        
                        feed_node["articles"].append(article_data)
                        if is_recent:
                            recent_articles.append(article_data)
                            
                    category_node["feeds"].append(feed_node)
                except Exception as e:
                    print(f"UPLINK_FAILED for {feed_info['name']}: {e}")
                    
            industry_node["categories"].append(category_node)
        tree["industries"].append(industry_node)

    with open("signals.js", "w", encoding="utf-8") as f:
        f.write(f"const signalTree = {json.dumps(tree, indent=4)};\n")
    print("UPLINK_COMPLETE: Data tree generated.")

    if send_email:
        dispatch_daily_brief(recent_articles)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--email", action="store_true", help="Send the daily briefing email")
    args = parser.parse_args()
    
    fetch_all_signals(send_email=args.email)
