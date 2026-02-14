import feedparser
import json
import re
import requests
from datetime import datetime

# --- TAXONOMY ---
# SURGICAL PATCH: Refined to reflect Primary Source Nodes (Gov, Forge, Archive, Sec)
CAT_CODES = {
    "GOV_DECK": "DARK",     # Gov Research (DARPA/IARPA/Labs)
    "PRIME_FORGE": "FORGE",  # Defense Contractors (Anduril/Shield AI)
    "RESEARCH_ARCHIVE": "ARCH", # Technical Papers (arXiv)
    "CYBER_SEC": "SEC_",    # Direct Security Alerts (CISA)
    "ORBIT_DECK": "SATL",   # Space/Satellite Primes
    "D_INT_DARK": "DARK",   # Legacy compatibility
    "NEURAL_LINK": "H+++",  # Institutional Research (MIT Lincoln)
    "MEGA_CORP": "CORP"     # Major Prime Announcements
}

# SURGICAL PATCH: Purged all "News/Opinion" sites.
# Now strictly using Official Gov, Contractor, and Agency Feeds.
FEEDS = {
    # OFFICIAL GOVERNMENT & INTEL NODES
    "GOV_DECK": "https://www.darpa.mil/news/rss",
    "IARPA_SIGNAL": "https://www.iarpa.gov/newsroom?format=feed&type=rss",
    "AFRL_NODE": "https://www.af.mil/RSS/", # Air Force Research Lab context
    
    # DEFENSE CONTRACTOR DIRECT (Primary Sources)
    "PRIME_FORGE": "https://www.anduril.com/news/feed/",
    "SHIELD_AI": "https://shield.ai/feed/",
    
    # TECHNICAL/ACADEMIC NODES (Original Research)
    "RESEARCH_ARCHIVE": "https://arxiv.org/rss/cs.AI",
    "MIT_LINCOLN": "https://www.ll.mit.edu/news/rss.xml",
    
    # SPACE/SATELLITE LOGISTICS (Primary Industry Signal)
    "ORBIT_DECK": "https://spacenews.com/feed/",
    
    # DIRECT CYBER INTELLIGENCE (CISA Alerts - Raw data, no commentary)
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
    
    for category, url in FEEDS.items():
        print(f"POLLING_SOURCE: {category}")
        feed = feedparser.parse(url)
        
        for entry in feed.entries[:20]:
            title = entry.title.upper()
            summary = re.sub(r'<[^>]+>', '', entry.get('summary', ''))
            target_cat = category
            
            # --- OVERRIDE LOGIC ---
            # Mapping Contractors to the FORGE
            if category in ["PRIME_FORGE", "SHIELD_AI"]:
                target_cat = "PRIME_FORGE"
            
            # High-Level Gov Intel Mapping
            elif category in ["GOV_DECK", "IARPA_SIGNAL", "AFRL_NODE"]:
                target_cat = "GOV_DECK"
                
            # ArXiv Filtering for Defense Funding
            elif category == "RESEARCH_ARCHIVE":
                is_defense = get_arxiv_acknowledgments(entry.link)
                keyword_match = any(word in (title + summary).upper() for word in DARPA_KEYWORDS)
                if not (is_defense or keyword_match):
                    continue 
                target_cat = "RESEARCH_ARCHIVE"

            signal_db.append({
                "id": f"GS-{hash(entry.link) % 10000}",
                "title": title,
                "type": target_cat,
                "cat_code": CAT_CODES.get(target_cat, "DECK"),
                "source": feed.feed.get('title', 'PRIMARY_NODE').split(':')[0].strip(),
                "description": summary[:400],
                "source_url": entry.link,
                "timestamp": datetime.now().strftime("%Y.%m.%d")
            })

    # Save to signals.js
    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")
    print(f"UPLINK_COMPLETE: {len(signal_db)} PRIMARY_SIGNALS_LOCKED")

if __name__ == "__main__":
    fetch_and_format()
