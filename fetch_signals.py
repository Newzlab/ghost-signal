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
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from time import mktime

# --- CONFIGURATION ---
MAX_HISTORY_PER_FEED = 50  

MASTER_CONFIG = {
    "DEFENSE_SYSTEMS": {
        "UNMANNED_AUTONOMY": [
            {"name": "SHIELD_AI", "url": "https://shield.ai/feed/"},
            {"name": "C4ISRNET_UNMANNED", "url": "https://www.c4isrnet.com/arc/outboundfeeds/rss/category/unmanned/"}
        ],
        "GOVERNMENT_DECKS": [
            {"name": "DEFENSE_ONE_TECH", "url": "https://www.defenseone.com/rss/technology/"},
            {"name": "DEFENSE_NEWS", "url": "https://www.defensenews.com/arc/outboundfeeds/rss/"}
        ],
        "RESEARCH_LABS": [
            {"name": "ARXIV_AI_PAPERS", "url": "https://arxiv.org/rss/cs.AI"}
        ]
    },
    "AEROSPACE_COMMAND": {
        "ORBITAL_LOGISTICS": [
            {"name": "SPACE_NEWS", "url": "https://spacenews.com/feed/"},
            {"name": "NASA_BREAKING", "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss"}
        ]
    },
    "CYBER_INTELLIGENCE": {
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

def load_existing_history(filepath="signals.js"):
    historical_data = {}
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                json_str = content.replace("const signalTree = ", "").strip().rstrip(";")
                old_tree = json.loads(json_str)
                
                for ind in old_tree.get("industries", []):
                    for cat in ind.get("categories", []):
                        for feed in cat.get("feeds", []):
                            historical_data[feed["name"]] = feed.get("articles", [])
        except Exception as e:
            print(f"      [!] WARNING: Could not parse existing history: {e}")
    return historical_data

def clean_summary(text):
    clean = re.sub(r'<[^>]+>', '', text)
    return clean[:4000] # Give the AI enough text to read

def deep_scrape_article(url):
    # THE ARXIV BYPASS: Their RSS feed has the full abstract. Scraping grabs the footer.
    if "arxiv.org" in url:
        return None

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
            return clean[:4000]
        return None
    except Exception as e:
        print(f"      [!] DEEP_SCRAPE_BLOCKED for {url}")
        return None

def summarize_with_ai(article_text):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("      [!] ERROR: GEMINI_API_KEY not found in environment variables.")
        return None
        
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.5-flash") 
        
        prompt = f"""
        You are an elite OSINT (Open Source Intelligence) AI. 
        Read the following intercepted article text and summarize it.
        Format your response EXACTLY like this (use HTML formatting for the bold tags):
        
        <br><strong>STATUS:</strong> [1 sentence summarizing the core event]<br><br><strong>INTEL:</strong> [1 short paragraph providing the crucial context, strategic implications, or technical details]
        
        Article Text:
        {article_text}
        """
        
        response = model.generate_content(
            prompt,
            safety_settings={
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            }
        )
        return response.text.strip()
    except Exception as e:
        print(f"      [!] AI_DECRYPT_FAILED: {e}")
        return None

def dispatch_daily_brief(recent_articles):
    sender = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASS")
    receiver_string = os.environ.get("SMTP_TO")

    if not all([sender, password, receiver_string]):
        print("SYSTEM_WARNING: Missing SMTP credentials. Email aborted.")
        return

    receivers = [email.strip() for email in receiver_string.split(",") if email.strip()]

    if not recent_articles:
        print("NO_NEW_SIGNALS: Skipping email dispatch.")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"GHOST SIGNAL // Daily Intel Brief ({datetime.now().strftime('%Y.%m.%d')})"
    msg["From"] = f"Ghost Signal Network <{sender}>"
    msg["To"] = "Ghost Signal Network" 

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
        server.sendmail(sender, receivers, msg.as_string())
        server.quit()
        print(f"UPLINK_SUCCESS: Daily Briefing Dispatched to {len(receivers)} nodes.")
    except Exception as e:
        print(f"MAILER_ERROR: {e}")

def fetch_all_signals(send_email=False):
    tree = {"industries": []}
    recent_articles = []
    time_limit = datetime.now() - timedelta(days=1)
    
    historical_feeds = load_existing_history()

    for ind_name, categories in MASTER_CONFIG.items():
        industry_node = {"name": ind_name, "categories": []}
        
        for cat_name, feeds in categories.items():
            category_node = {"name": cat_name, "feeds": []}
            
            for feed_info in feeds:
                print(f"POLLING_SOURCE: {feed_info['name']}...")
                feed_name = feed_info['name']
                
                old_articles = historical_feeds.get(feed_name, [])
                old_urls = {art["source_url"] for art in old_articles}
                new_articles_for_feed = []

                try:
                    response = requests.get(feed_info['url'], headers=HEADERS, timeout=15)
                    response.raise_for_status()
                    
                    parsed = feedparser.parse(response.content)
                    
                    for entry in parsed.entries[:15]: 
                        if entry.link in old_urls:
                            continue
                            
                        date_val = datetime.now().strftime("%Y.%m.%d")
                        is_recent = False
                        
                        if hasattr(entry, 'published_parsed') and entry.published_parsed:
                            entry_dt = datetime.fromtimestamp(mktime(entry.published_parsed))
                            date_val = entry_dt.strftime("%Y.%m.%d")
                            if entry_dt >= time_limit:
                                is_recent = True
                        
                        # STEP 1: Get the text (either via deep scrape, or fallback to RSS summary)
                        text_to_analyze = deep_scrape_article(entry.link)
                        
                        if not text_to_analyze or len(text_to_analyze) < 150:
                            fallback_desc = entry.get('summary', entry.get('description', 'NO_DESCRIPTION_AVAILABLE'))
                            text_to_analyze = clean_summary(fallback_desc)

                        # STEP 2: Universal AI Decrypt
                        final_desc = "NO_DESCRIPTION_AVAILABLE"
                        if text_to_analyze and len(text_to_analyze) > 50:
                            print(f"    > INITIATING_AI_DECRYPT for NEW ARTICLE: {entry.title[:40]}...")
                            ai_summary = summarize_with_ai(text_to_analyze)
                            
                            if ai_summary:
                                print("      [+] AI_DECRYPT_SUCCESS")
                                final_desc = ai_summary
                                time.sleep(4.2) 
                            else:
                                final_desc = text_to_analyze
                        else:
                            final_desc = text_to_analyze
                        
                        article_data = {
                            "id": f"GS-{hash(entry.link) % 100000}",
                            "title": entry.title.upper(),
                            "description": final_desc,
                            "source_url": entry.link,
                            "timestamp": date_val,
                            "feed_name": feed_name
                        }
                        
                        new_articles_for_feed.append(article_data)
                        
                        if is_recent:
                            recent_articles.append(article_data)
                            
                    combined_articles = new_articles_for_feed + old_articles
                    capped_articles = combined_articles[:MAX_HISTORY_PER_FEED]
                    
                    feed_node = {"name": feed_name, "articles": capped_articles}
                    category_node["feeds"].append(feed_node)
                    
                except Exception as e:
                    print(f"UPLINK_FAILED for {feed_info['name']}: {e}")
                    category_node["feeds"].append({"name": feed_name, "articles": old_articles[:MAX_HISTORY_PER_FEED]})
                    
            industry_node["categories"].append(category_node)
        tree["industries"].append(industry_node)

    with open("signals.js", "w", encoding="utf-8") as f:
        f.write(f"const signalTree = {json.dumps(tree, indent=4)};\n")
    print("UPLINK_COMPLETE: Data tree generated and history merged.")

    if send_email:
        dispatch_daily_brief(recent_articles)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--email", action="store_true", help="Send the daily briefing email")
    args = parser.parse_args()
    
    fetch_all_signals(send_email=args.email)
