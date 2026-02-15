import feedparser
import json
import re
import requests
from datetime import datetime

# --- TAXONOMY ---
# Key: The 'type' string used by terminal.js filter
# Value: The shorthand 'cat_code' displayed in the Directory
CAT_CODES = {
    "GOV_DECK": "DARK",
    "PRIME_FORGE": "FORGE",
    "RESEARCH_ARCHIVE": "ARCH",
    "CYBER_SEC": "SEC_",
    "ORBIT_DECK": "SATL",
    "MEGA_CORP": "CORP"
}

# Strictly Official Gov, Contractor, and Agency Feeds.
FEEDS = {
    "GOV_DECK": "https://www.darpa.mil/news/rss",
    "IARPA_SIGNAL": "https://www.iarpa.gov/newsroom?format=feed&type=rss",
    "AFRL_NODE": "https://www.af.mil/RSS/", 
    
    "PRIME_FORGE": "https://www.anduril.com/news/feed/",
    "SHIELD_AI": "https://shield.ai/feed/",
    
    "RESEARCH_ARCHIVE": "https://arxiv.org/rss/cs.AI",
    "MIT_LINCOLN": "https://www.ll.mit.edu/news/rss.xml",
    
    "ORBIT_DECK": "https://spacenews.com/feed/",
    "CYBER_SEC": "https://www.cisa.gov/cybersecurity-advisories/all.xml"
}

DARPA_KEYWORDS = ["DARPA", "ANSR", "AIQ", "CLARA", "SHAFTO", "SOLICITATION", "PROTOTYPE", "CONTRACT", "AUTONOMOUS", "SWARM", "WARFARE"]

def get_arxiv_acknowledgments(url):
    """Scrapes arXiv for funding credits."""
    try:
        response = requests.get(url, timeout=5, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code == 200:
            return any(word in response.text.upper() for word in DARPA_KEYWORDS)
    except:
        return False
    return False

def fetch_and_format():
    signal_db = []
    
    for source_key, url in FEEDS.items():
        print(f"POLLING_SOURCE: {source_key}")
        feed = feedparser.parse(url)
        
        for entry in feed.entries[:15]:
            title = entry.title.upper()
            summary = re.sub(r'<[^>]+>', '', entry.get('summary', ''))
            
            # --- SURGICAL OVERRIDE LOGIC ---
            # Ensure target_cat matches index.html onclick values EXACTLY
            target_cat = "DECK"
            
            if source_key in ["GOV_DECK", "IARPA_SIGNAL", "AFRL_NODE"]:
                target_cat = "GOV_DECK"
            
            elif source_key in ["PRIME_FORGE", "SHIELD_AI"]:
                target_cat = "PRIME_FORGE"
                
            elif source_key in ["ORBIT_DECK"]:
                # High-level industry signal doubles as CORP intel if specific keywords match
                if any(word in title for word in ["BOEING", "LOCKHEED", "NORTHROP", "ACQUISITION"]):
                    target_cat = "MEGA_CORP"
                else:
                    target_cat = "ORBIT_DECK"
            
            elif source_key in ["RESEARCH_ARCHIVE", "MIT_LINCOLN"]:
                target_cat = "RESEARCH_ARCHIVE"
                # For ArXiv, we still check defense context but allow MIT Lincoln papers by default
                if source_key == "RESEARCH_ARCHIVE":
                    is_defense = get_arxiv_acknowledgments(entry.link)
                    keyword_match = any(word in (title + summary).upper() for word in DARPA_KEYWORDS)
                    if not (is_defense or keyword_match):
                        continue 

            elif source_key == "CYBER_SEC":
                target_cat = "CYBER_SEC"

            # Create entry
            signal_db.append({
                "id": f"GS-{hash(entry.link) % 10000}",
                "title": title,
                "type": target_cat, # This matches the JS filter parameter
                "cat_code": CAT_CODES.get(target_cat, "DECK"),
                "source": feed.feed.get('title', 'PRIMARY_NODE').split(':')[0].strip(),
                "description": summary[:400] if summary else "NO_DESCRIPTION_AVAILABLE_DECRYPT_VIA_RAW_SOURCE",
                "source_url": entry.link,
                "timestamp": datetime.now().strftime("%Y.%m.%d")
            })

    # Save to signals.js
    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")
    print(f"UPLINK_COMPLETE: {len(signal_db)} PRIMARY_SIGNALS_LOCKED")

if __name__ == "__main__":
    fetch_and_format()
