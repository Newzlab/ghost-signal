import feedparser
import json
import re
import time
from datetime import datetime

# --- CYBERPUNK TAXONOMY ---
CAT_CODES = {
    "NEURAL_LINK": "H+++",  # Advanced Tech/AI
    "MEGA_CORP": "CORP",   # Space/Industry/Big Tech
    "SYNTH_CITY": "URBN",   # Cyberpunk/Surveillance/Cities
    "VOID_SIGHT": "VOID",   # Speculative Fiction/Dystopia
    "ORBIT_DECK": "SATL",   # Space Exploration/Satellites
    "GHOST_GEAR": "GEAR",   # UAPs/Defense Tech
    "DARK_NET": "SEC_"      # Cybersecurity/Hacking
}

FEEDS = {
    "NEURAL_LINK": "https://thedebrief.org/feed/",
    "MEGA_CORP": "https://futurism.com/feed/",
    "SYNTH_CITY": "https://www.wired.com/feed/category/science/latest/rss", 
    "VOID_SIGHT": "https://clarkesworldmagazine.com/feed/",
    "ORBIT_DECK": "https://www.nasa.gov/rss/recently_published_content.rss",
    "GHOST_GEAR": "https://thehacker news.com/feeds/posts/default",
    "DARK_NET": "https://www.helpnetsecurity.com/view/news/feed/"
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
        clean_url = f"{url}?t={int(time.time())}"
        feed = feedparser.parse(clean_url)
        source = feed.feed.get('title', 'DECK_LOG').split(' - ')[0].split(':')[0].strip()
        
        for entry in feed.entries[:8]:
            title = entry.title.upper()
            summary = deep_scrub(entry.get('summary', entry.get('description', '')))
            
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

    signal_db.sort(key=lambda x: x['timestamp'], reverse=True)
    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")

if __name__ == "__main__":
    fetch_and_format()
