import feedparser
import json
import re
import time
import requests
from datetime import datetime

# --- TAXONOMY | 2026 STABLE ---
# Mapped to match the target_cat strings exactly to avoid [DECK] leakage
CAT_CODES = {
    "D_INT_DARK": "DARK",
    "NEURAL_LINK": "H+++",
    "MEGA_CORP": "CORP",
    "DARK_NET": "SEC_",
    "ORBIT_DECK": "SATL",
    "SYNTH_CITY": "URBN"
}

FEEDS = {
    "D_INT_DARK": "https://www.darpa.mil/news/rss",
    "ARXIV_AI": "https://arxiv.org/rss/cs.AI",
    "ANDURIL": "https://www.anduril.com/news/feed/",
    "SHIELD_AI": "https://shield.ai/feed/",
    "NEURAL_LINK": "https://thedebrief.org/feed/",
    "DARK_NET": "https://thehackernews.com/feeds/posts/default"
}

DARPA_KEYWORDS = [
    "DARPA", "ANSR", "AIQ", "CLARA", "SHAFTO", "SUSMIT JHA", "VALPIANI", 
    "NAVY", "AFOSR", "AUTONOMOUS WEAPON", "SWARM", "ELECTRONIC WARFARE",
    "LARGE LANGUAGE MODEL DEFENSE", "CYBER ATTACK LOGIC", "ANDURIL", "SHIELD AI"
]

def get_arxiv_acknowledgments(url):
    """Deep-scrapes arXiv abstract pages for defense funding signatures."""
    try:
        response = requests.get(url, timeout=5, headers={'User-Agent': 'GhostSignal/2.0'})
        if response.status_code == 200:
            content = response.text.upper()
            return any(word in content for word in DARPA_KEYWORDS)
    except:
        return False
    return False

def fetch_and_format():
    signal_db = []
    
    for category, url in FEEDS.items():
        print(f"POLLING_NODE: {category}")
        feed = feedparser.parse(url)
        
        # Buffer limited to top 25 to prevent GitHub Action timeouts
        for entry in feed.entries[:25]:
            title = entry.title.upper()
            # Clean HTML tags from summary
            summary = re.sub(r'<[^>]+>', '', entry.get('summary', ''))
            
            target_cat = category
            
            # --- UPLINK LOGIC: DEFENSE SOURCE FORCING ---
            if category in ["D_INT_DARK", "ANDURIL", "SHIELD_AI"]:
                target_cat = "D_INT_DARK"
            
            # --- UPLINK LOGIC: ARXIV SCRAPE ---
            elif category == "ARXIV_AI":
                is_defense_funded = get_arxiv_acknowledgments(entry.link)
                keyword_match = any(word in (title + summary).upper() for word in DARPA_KEYWORDS)
                
                if not (is_defense_funded or keyword_match):
                    continue 
                target_cat = "D_INT_DARK"

            # --- DATA CONSTRUCTION ---
            signal_db.append({
                "id": f"GS-{hash(entry.link) % 10000}",
                "title": title,
                "type": target_cat,
                # Fix: Using target_cat directly with the corrected CAT_CODES mapping
                "cat_code": CAT_CODES.get(target_cat, "DECK"),
                "source": feed.feed.get('title', 'INTEL_NODE').split(':')[0].strip(),
                "description": summary[:400] + "...",
                "source_url": entry.link,
                "timestamp": datetime.now().strftime("%Y.%m.%d")
            })

    # Save to signals.js for the Frontend Uplink
    with open("signals.js", "w") as f:
        # Wrapping in a JS constant for direct import
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")
    
    print(f"UPLINK_COMPLETE: {len(signal_db)} SIGNALS_ENCRYPTED_TO_JS")

if __name__ == "__main__":
    fetch_and_format()
