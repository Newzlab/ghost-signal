import feedparser
import json
import re
import requests
from datetime import datetime

CAT_CODES = {
    "D_INT_DARK": "DARK",
    "NEURAL_LINK": "H+++",
    "MEGA_CORP": "CORP",
    "DARK_NET": "SEC_",
    "ARXIV_AI": "DARK",
    "ANDURIL": "DARK",
    "SHIELD_AI": "DARK"
}

FEEDS = {
    "D_INT_DARK": "https://www.darpa.mil/news/rss",
    "ARXIV_AI": "https://arxiv.org/rss/cs.AI",
    "ANDURIL": "https://www.anduril.com/news/feed/",
    "SHIELD_AI": "https://shield.ai/feed/",
    "NEURAL_LINK": "https://thedebrief.org/feed/",
    "DARK_NET": "https://thehackernews.com/feeds/posts/default"
}

DARPA_KEYWORDS = ["DARPA", "ANSR", "AIQ", "CLARA", "SHAFTO", "SUSMIT JHA", "VALPIANI", "NAVY", "AFOSR", "AUTONOMOUS", "SWARM", "WARFARE"]

def get_arxiv_acknowledgments(url):
    try:
        response = requests.get(url, timeout=5, headers={'User-Agent': 'Mozilla/5.0'})
        return any(word in response.text.upper() for word in DARPA_KEYWORDS)
    except: return False

def fetch_and_format():
    signal_db = []
    for category, url in FEEDS.items():
        feed = feedparser.parse(url)
        for entry in feed.entries[:20]:
            title = entry.title.upper()
            summary = re.sub(r'<[^>]+>', '', entry.get('summary', ''))
            target_cat = category
            
            if category in ["D_INT_DARK", "ANDURIL", "SHIELD_AI"]:
                target_cat = "D_INT_DARK"
            elif category == "ARXIV_AI":
                if not (get_arxiv_acknowledgments(entry.link) or any(w in title for w in DARPA_KEYWORDS)): continue
                target_cat = "D_INT_DARK"

            signal_db.append({
                "id": f"GS-{hash(entry.link) % 10000}",
                "title": title,
                "type": target_cat,
                "cat_code": CAT_CODES.get(target_cat, "DARK"),
                "source": feed.feed.get('title', 'INTEL_NODE').split(':')[0].strip(),
                "description": summary[:500],
                "source_url": entry.link,
                "timestamp": datetime.now().strftime("%Y.%m.%d")
            })

    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")

if __name__ == "__main__":
    fetch_and_format()
