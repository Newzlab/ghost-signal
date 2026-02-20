import feedparser
import json
import re
import os
import smtplib
import argparse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from time import mktime

# --- CONFIGURATION: THE SOURCE TREE ---
MASTER_CONFIG = {
    "DEFENSE_SYSTEMS": {
        "UNMANNED_AUTONOMY": [
            {"name": "SHIELD_AI", "url": "https://shield.ai/feed/"},
            {"name": "ANDURIL_INDUSTRIES", "url": "https://www.anduril.com/news/feed/"}
        ],
        "GOVERNMENT_DECKS": [
            {"name": "DARPA_WIRE", "url": "https://www.darpa.mil/news/rss"},
            {"name": "IARPA_SIGNAL", "url": "https://www.iarpa.gov/newsroom?format=feed&type=rss"},
            {"name": "AFRL_NODE", "url": "https://www.af.mil/RSS/"}
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

def clean_summary(text):
    clean = re.sub(r'<[^>]+>', '', text)
    return clean[:400] + "..." if len(clean) > 400 else clean

def dispatch_daily_brief(recent_articles):
    """Compiles and sends the 24-hour intel report via email."""
    sender = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASS")
    receiver = os.environ.get("SMTP_TO")

    if not all([sender, password, receiver]):
        print("SYSTEM_WARNING: Missing SMTP credentials in GitHub Secrets. Email aborted.")
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
            <div style="font-size: 14px; color: #aaa; margin-bottom: 10px;">{art['description']}</div>
            <a href="{art['source_url']}" style="color: #FF5500; text-decoration: none; font-size: 12px; border: 1px solid #FF5500; padding: 5px 10px; display: inline-block;">ACCESS RAW DATA</a>
        </div>
        """

    html_body += "</body></html>"
    msg.attach(MIMEText(html_body, "html"))

    try:
        # Assuming Gmail SMTP. Adjust if using SendGrid, etc.
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
                    parsed = feedparser.parse(feed_info['url'])
                    feed_node = {"name": feed_info['name'], "articles": []}
                    
                    for entry in parsed.entries[:15]:
                        # Handle Date Extraction
                        date_val = datetime.now().strftime("%Y.%m.%d")
                        is_recent = False
                        
                        if hasattr(entry, 'published_parsed') and entry.published_parsed:
                            entry_dt = datetime.fromtimestamp(mktime(entry.published_parsed))
                            date_val = entry_dt.strftime("%Y.%m.%d")
                            if entry_dt >= time_limit:
                                is_recent = True
                        
                        desc = entry.get('summary', entry.get('description', 'NO_DESCRIPTION_AVAILABLE'))
                        clean_desc = clean_summary(desc)
                        
                        article_data = {
                            "id": f"GS-{hash(entry.link) % 100000}",
                            "title": entry.title.upper(),
                            "description": clean_desc,
                            "source_url": entry.link,
                            "timestamp": date_val,
                            "feed_name": feed_info['name'] # Saved for the email loop
                        }
                        
                        feed_node["articles"].append(article_data)
                        
                        if is_recent:
                            recent_articles.append(article_data)
                    
                    category_node["feeds"].append(feed_node)
                except Exception as e:
                    print(f"UPLINK_FAILED for {feed_info['name']}: {e}")
                    
            industry_node["categories"].append(category_node)
        tree["industries"].append(industry_node)

    # Save to UI
    with open("signals.js", "w", encoding="utf-8") as f:
        f.write(f"const signalTree = {json.dumps(tree, indent=4)};\n")
    print("UPLINK_COMPLETE: Data tree generated.")

    # Trigger Email if requested
    if send_email:
        dispatch_daily_brief(recent_articles)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--email", action="store_true", help="Send the daily briefing email")
    args = parser.parse_args()
    
    fetch_all_signals(send_email=args.email)
