import feedparser
import json
import re
import time
from datetime import datetime

# --- CONFIGURATION ---
DISTRACTION_BLACKLIST = ["GRAMMYS", "SUPERBOWL", "NFL", "CELEBRITY", "RED CARPET"]

CAT_CODES = {
    "NEURAL_LINK": "H+++",  # Advanced Tech/AI
    "MEGA_CORP": "CORP",   # Space/Industry/Big Tech
    "SYNTH_CITY": "URBN",   # Cyberpunk/Surveillance/Cities
    "VOID_SIGHT": "VOID"    # Speculative Fiction/Dystopia
}

FEEDS = {
    "NEURAL_LINK": "https://thedebrief.org/feed/",
    "MEGA_CORP": "https://futurism.com/feed/",
    "SYNTH_CITY": "https://www.wired.com/feed/category/science/latest/rss", 
    "VOID_SIGHT": "https://clarkesworldmagazine.com/feed/"
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
    for category, url in FEEDS.items():
        # CACHE BUSTER: Adds timestamp to URL to force fresh fetch
        clean_url = f"{url}?t={int(time.time())}"
        feed = feedparser.parse(clean_url)
        
        source = feed.feed.get('title', 'DECK_LOG').split(' - ')[0].split(':')[0].strip()
        
        for entry in feed.entries[:10]:
            title = entry.title.upper()
            raw_summary = entry.get('summary', entry.get('description', ''))
            summary = deep_scrub(raw_summary)
            
            if any(word in title or word in summary.upper() for word in DISTRACTION_BLACKLIST):
                continue
                
            signal_db.append({
                "id": f"GS-{entry.get('id', entry.link)[-5:]}",
                "title": title,
                "type": category,
                "cat_code": CAT_CODES.get(category, "MISC"),
                "source": source,
                "description": summary,
                "source_url": entry.link,
                "timestamp": entry.get('published', datetime.now().strftime("%Y.%m.%d"))
            })

    # Sort: Newest first
    signal_db.sort(key=lambda x: x['timestamp'], reverse=True)

    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")

if __name__ == "__main__":
    fetch_and_format()
