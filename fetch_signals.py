import feedparser
import json
import re
import time
import ssl
from datetime import datetime

# Fix for SSL certificate issues on some servers
if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context

# --- DEFENSE INTEL COORDINATES ---
CAT_CODES = {
    "D_INT_DARK": "DARK",  # DARPA, Contracts, Defense Labs
    "NEURAL_LINK": "H+++", 
    "MEGA_CORP": "CORP",   
    "DARK_NET": "SEC_"
}

# New high-value sources integrated from your research
FEEDS = {
    "D_INT_DARK": "https://www.darpa.mil/news/rss",
    "ARXIV_AI": "https://arxiv.org/rss/cs.AI", # Filtered for DARPA keywords
    "ANDURIL": "https://www.anduril.com/news/feed/",
    "SHIELD_AI": "https://shield.ai/feed/",
    "NEURAL_LINK": "https://thedebrief.org/feed/",
    "MEGA_CORP": "https://futurism.com/feed/",
    "VOID_SIGHT": "https://clarkesworldmagazine.com/feed/",
    "DARK_NET": "https://thehackernews.com/feeds/posts/default"
}

# Keywords to trigger a D-INT signal from general research feeds
DARPA_PROTOCOL_KEYWORDS = ["DARPA", "ANSR", "AIQ", "CLARA", "SHAFTO", "SUSMIT JHA", "VALPIANI"]

def deep_scrub(text):
    text = re.sub(r'<[^>]+>', '', text) 
    text = re.sub(r'http\S+', '', text) 
    junk = ["The post", "appeared first on", "read more", "Check out"]
    for marker in junk:
        if marker in text: text = text.split(marker)[0]
    return text.strip()

def fetch_and_format():
    signal_db = []
    feedparser.USER_AGENT = "GhostSignalBot/2.0 (Defense Intel Module)"

    for category, url in FEEDS.items():
        print(f"POLLING_UPLINK: {category}")
        feed = feedparser.parse(f"{url}?t={int(time.time())}")
        
        for entry in feed.entries[:12]:
            title = entry.title.upper()
            summary = deep_scrub(entry.get('summary', entry.get('description', '')))
            
            # Specialized Filter: If it's arXiv, only include it if DARPA keywords are found
            if category == "ARXIV_AI":
                if not any(word in (title + summary).upper() for word in DARPA_PROTOCOL_KEYWORDS):
                    continue
                target_category = "D_INT_DARK" # Re-route to D-INT
            else:
                target_category = category

            signal_db.append({
                "id": f"GS-{entry.get('id', entry.link)[-5:]}",
                "title": title,
                "type": target_category,
                "cat_code": CAT_CODES.get(target_category, "DECK"),
                "source": feed.feed.get('title', 'OSINT_FEED').split(' - ')[0],
                "description": summary[:500] + "...",
                "source_url": entry.link,
                "timestamp": datetime.now().strftime("%Y.%m.%d")
            })

    signal_db.sort(key=lambda x: x['timestamp'], reverse=True)
    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")
    print(f"UPLINK_COMPLETE: {len(signal_db)} SIGNALS_STORED")

if __name__ == "__main__":
    fetch_and_format()
