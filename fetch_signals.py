import feedparser
import json
import re
import time
import requests
from datetime import datetime

# --- TAXONOMY ---
CAT_CODES = {
    "D_INT_DARK": "DARK",
    "NEURAL_LINK": "H+++",
    "MEGA_CORP": "CORP",
    "DARK_NET": "SEC_"
}

FEEDS = {
    "D_INT_DARK": "https://www.darpa.mil/news/rss",
    "ARXIV_AI": "https://arxiv.org/rss/cs.AI",
    "ANDURIL": "https://www.anduril.com/news/feed/",
    "SHIELD_AI": "https://shield.ai/feed/",
    "NEURAL_LINK": "https://thedebrief.org/feed/",
    "DARK_NET": "https://thehackernews.com/feeds/posts/default"
}

# Wider net for 2026 Defense Trends
DARPA_KEYWORDS = [
    "DARPA", "ANSR", "AIQ", "CLARA", "SHAFTO", "SUSMIT JHA", "VALPIANI", 
    "NAVY", "AFOSR", "AUTONOMOUS WEAPON", "SWARM", "ELECTRONIC WARFARE",
    "LARGE LANGUAGE MODEL DEFENSE", "CYBER ATTACK LOGIC"
]
def get_arxiv_acknowledgments(url):
    """Deep-scrapes arXiv abstract pages for funding credits."""
    try:
        # arXiv links in RSS are usually /abs/ format
        response = requests.get(url, timeout=5, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code == 200:
            # Look for common funding phrases
            found = any(word in response.text.upper() for word in DARPA_KEYWORDS)
            return found
    except:
        return False
    return False

def fetch_and_format():
    signal_db = []
    
    for category, url in FEEDS.items():
        print(f"POLLING: {category}")
        feed = feedparser.parse(url)
        
        # INCREASED BUFFER: Check top 25 entries for D-INT hits
        for entry in feed.entries[:25]:
            title = entry.title.upper()
            summary = re.sub(r'<[^>]+>', '', entry.get('summary', ''))
            
            target_cat = category
            
            # --- FORCE UPLINK: DARPA/Anduril/Shield always go to DARK ---
            if category in ["D_INT_DARK", "ANDURIL", "SHIELD_AI"]:
                target_cat = "D_INT_DARK"
            
            # --- FILTERED UPLINK: arXiv only if it hits keywords ---
            elif category == "ARXIV_AI":
                is_defense_funded = get_arxiv_acknowledgments(entry.link)
                keyword_match = any(word in (title + summary).upper() for word in DARPA_KEYWORDS)
                
                if not (is_defense_funded or keyword_match):
                    continue 
                target_cat = "D_INT_DARK"

            # --- DEFAULT: Other feeds (H+++, SEC_) keep their original category ---
            else:
                target_cat = category

            signal_db.append({
                "id": f"GS-{hash(entry.link) % 10000}",
                "title": title,
                "type": target_cat,
                "cat_code": CAT_CODES.get(target_cat, "DECK"),
                "source": feed.feed.get('title', 'INTEL_NODE').split(':')[0].strip(),
                "description": summary[:400] + "...",
                "source_url": entry.link,
                "timestamp": datetime.now().strftime("%Y.%m.%d")
            })

    # Save to signals.js
    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")
    print(f"UPLINK_COMPLETE: {len(signal_db)} SIGNALS_LOCKED")

if __name__ == "__main__":
    fetch_and_format()
