import feedparser
import json
import re
from datetime import datetime

# --- THE FUTURIST KILL-LIST ---
DISTRACTION_BLACKLIST = ["GRAMMYS", "SUPERBOWL", "NFL", "CELEBRITY", "HOLLYWOOD"]

# --- THE CYBERPUNK CATEGORIES ---
CAT_CODES = {
    "NEURAL_LINK": "H+++",  # Transhumanism, AI, Bio-hacking
    "MEGA_CORP": "CORP",   # Tech giants, economics, space-race
    "SYNTH_CITY": "URBN",   # Cyberpunk aesthetics, smart cities, surveillance
    "VOID_SIGHT": "VOID"    # Dystopian trends, speculative fiction, apocalypse
}

FEEDS = {
    "NEURAL_LINK": "https://singularityhub.com/feed/",
    "MEGA_CORP": "https://futurism.com/feed/",
    "SYNTH_CITY": "https://cyberpunkdatabase.net/rss", 
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
        feed = feedparser.parse(url)
        # Clean Source Name
        source = feed.feed.get('title', 'DECK_LOG').split(' - ')[0].split(':')[0].strip()
        
        for entry in feed.entries[:15]:
            title = entry.title.upper()
            summary = deep_scrub(entry.get('summary', entry.get('description', '')))
            
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

    signal_db.sort(key=lambda x: x['timestamp'], reverse=True)
    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")

if __name__ == "__main__":
    fetch_and_format()
