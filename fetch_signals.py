import feedparser
import json
import re
from datetime import datetime

# --- CONFIGURATION ---
DISTRACTION_BLACKLIST = [
    "GRAMMYS", "SUPERBOWL", "CELEBRITY", "HOLLYWOOD", 
    "KARDASHIAN", "SWIFT", "NFL", "HALFTIME", "RED CARPET"
]

FEEDS = {
    "HUMANITARIAN": "https://www.thenewhumanitarian.org/rss/all.xml",
    "GEOPOLITICS": "https://www.csis.org/rss/publications",
    "SYSTEMIC": "https://www.propublica.org/feeds/propublica/main",
    "ENVIRONMENT": "https://news.mongabay.com/feed/"
}

def clean_html(raw_html):
    """Removes all HTML tags from a string."""
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext.strip()

def fetch_and_format():
    signal_db = []
    
    for category, url in FEEDS.items():
        feed = feedparser.parse(url)
        source_name = feed.feed.get('title', 'OSINT_SOURCE').split(' - ')[0]
        
        for entry in feed.entries[:10]:
            title = entry.title.upper()
            # SCRUB THE SUMMARY: Remove HTML tags here
            raw_summary = entry.get('summary', '')
            summary = clean_html(raw_summary)[:600] # Longer, clean preview
            
            if any(word in title or word in summary.upper() for word in DISTRACTION_BLACKLIST):
                continue
                
            signal_entry = {
                "id": f"GS-{entry.get('id', entry.link)[-5:]}",
                "title": title,
                "type": category,
                "source": source_name,
                "description": summary,
                "source_url": entry.link,
                "timestamp": entry.get('published', datetime.now().strftime("%Y.%m.%d %H:%M"))
            }
            signal_db.append(signal_entry)

    signal_db.sort(key=lambda x: x['timestamp'], reverse=True)

    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")

if __name__ == "__main__":
    fetch_and_format()
