import feedparser
import json
import re
import time
import ssl
from datetime import datetime

# Fix for SSL certificate issues on some servers
if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context

# --- CYBERPUNK TAXONOMY ---
CAT_CODES = {
    "NEURAL_LINK": "H+++",
    "MEGA_CORP": "CORP",
    "SYNTH_CITY": "URBN",
    "VOID_SIGHT": "VOID",
    "ORBIT_DECK": "SATL",
    "GHOST_GEAR": "GEAR",
    "DARK_NET": "SEC_"
}

FEEDS = {
    "NEURAL_LINK": "https://thedebrief.org/feed/",
    "MEGA_CORP": "https://futurism.com/feed/",
    "SYNTH_CITY": "https://www.wired.com/feed/category/science/latest/rss", 
    "VOID_SIGHT": "https://clarkesworldmagazine.com/feed/",
    "ORBIT_DECK": "https://www.nasa.gov/news-release/feed/", 
    "GHOST_GEAR": "https://spectrum.ieee.org/rss/robotics/fulltext",
    "DARK_NET": "https://thehackernews.com/feeds/posts/default"
}

def deep_scrub(text):
    text = re.sub(r'<[^>]+>', '', text) 
    text = re.sub(r'http\S+', '', text) 
    junk = ["The post", "appeared first on", "read more", "Check out"]
    for marker in junk:
        if marker in text: text = text.split(marker)[0]
    return text.strip()

def fetch_and_format():
    signal_db = []
    # Set a User-Agent so we don't get blocked by security filters
    feedparser.USER_AGENT = "GhostSignalBot/1.0 (+https://newzlab.net)"

    for category, url in FEEDS.items():
        print(f"FETCHING_SIGNAL: {category}...")
        clean_url = f"{url}?t={int(time.time())}"
        feed = feedparser.parse(clean_url)
        
        # Fallback for source title
        source = feed.feed.get('title', 'DECK_LOG').split(' - ')[0].split(':')[0].strip()
        
        if not feed.entries:
            print(f"!!! SIGNAL_LOST: {category}")
            continue

        for entry in feed.entries[:10]:
            title = entry.title.upper()
            raw_summary = entry.get('summary', entry.get('description', ''))
            summary = deep_scrub(raw_summary)
            
            # Formatting Date
            date_str = entry.get('published', datetime.now().strftime("%Y.%m.%d"))
            
            signal_db.append({
                "id": f"GS-{entry.get('id', entry.link)[-5:]}",
                "title": title,
                "type": category,
                "cat_code": CAT_CODES.get(category, "MISC"),
                "source": source,
                "description": summary,
                "source_url": entry.link,
                "timestamp": date_str
            })

    # Sort: Newest first
    signal_db.sort(key=lambda x: x['timestamp'], reverse=True)
    
    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")
    print(f"UPLINK_COMPLETE: {len(signal_db)} SIGNALS_STORED")

if __name__ == "__main__":
    fetch_and_format()
