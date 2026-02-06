import feedparser
import json
import re
from datetime import datetime

# --- CONFIGURATION ---
DISTRACTION_BLACKLIST = [
    "GRAMMYS", "SUPERBOWL", "CELEBRITY", "HOLLYWOOD", 
    "KARDASHIAN", "SWIFT", "NFL", "HALFTIME", "RED CARPET"
]

# Mapping Categories to 4-Char codes
CAT_CODES = {
    "HUMANITARIAN": "HUMA",
    "GEOPOLITICS": "GEOP",
    "SYSTEMIC": "SYST",
    "ENVIRONMENT": "ENVI"
}

FEEDS = {
    "HUMANITARIAN": "https://www.thenewhumanitarian.org/rss/all.xml",
    "GEOPOLITICS": "https://www.csis.org/rss/publications",
    "SYSTEMIC": "https://www.propublica.org/feeds/propublica/main",
    "ENVIRONMENT": "https://news.mongabay.com/feed/"
}

def clean_content(text):
    """Deep scrub for HTML and RSS footer junk."""
    # Remove all HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove any remaining URLs/Hyperlinks starting with http
    text = re.sub(r'http\S+', '', text)
    
    junk_markers = ["The post", "appeared first on", "read more", "Check out"]
    for marker in junk_markers:
        if marker in text:
            text = text.split(marker)[0]
            
    return text.strip()

def fetch_and_format():
    signal_db = []
    
    for category, url in FEEDS.items():
        feed = feedparser.parse(url)
        # Get a clean source name (e.g., "ProPublica")
        source_name = feed.feed.get('title', 'OSINT').split(' - ')[0].split(':')[0].strip()
        
        for entry in feed.entries[:15]:
            title = entry.title.upper()
            raw_summary = entry.get('summary', entry.get('description', ''))
            summary = clean_content(raw_summary)
            
            if any(word in title or word in summary.upper() for word in DISTRACTION_BLACKLIST):
                continue
                
            signal_entry = {
                "id": f"GS-{entry.get('id', entry.link)[-5:]}",
                "title": title,
                "type": category,
                "cat_code": CAT_CODES.get(category, "MISC"), # THE 4-CHAR CODE
                "source": source_name, # THE SOURCE NAME
                "description": summary,
                "source_url": entry.link,
                "timestamp": entry.get('published', datetime.now().strftime("%Y.%m.%d"))
            }
            signal_db.append(signal_entry)

    signal_db.sort(key=lambda x: x['timestamp'], reverse=True)

    with open("signals.js", "w") as f:
        # We export the 'db' variable for the JS to read
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")

if __name__ == "__main__":
    fetch_and_format()
