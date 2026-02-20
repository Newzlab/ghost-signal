import feedparser
import json
import re
from datetime import datetime

# --- CONFIGURATION: THE SOURCE TREE (EXPANDED) ---
MASTER_CONFIG = {
    "DEFENSE_SYSTEMS": {
        "UNMANNED_AUTONOMY": [
            {"name": "SHIELD_AI", "url": "https://shield.ai/feed/"},
            {"name": "ANDURIL_INDUSTRIES", "url": "https://www.anduril.com/news/feed/"}
        ],
        "GOVERNMENT_DECKS": [
            {"name": "DARPA_WIRE", "url": "https://www.darpa.mil/news/rss"},
            {"name": "IARPA_SIGNAL", "url": "https://www.iarpa.gov/newsroom?format=feed&type=rss"},
            {"name": "AFRL_NODE", "url": "https://www.af.mil/RSS/"}
        ],
        "RESEARCH_LABS": [
            {"name": "MIT_LINCOLN_LAB", "url": "https://www.ll.mit.edu/news/rss.xml"},
            {"name": "ARXIV_AI_PAPERS", "url": "https://arxiv.org/rss/cs.AI"}
        ]
    },
    "AEROSPACE_COMMAND": {
        "ORBITAL_LOGISTICS": [
            {"name": "SPACE_NEWS", "url": "https://spacenews.com/feed/"},
            {"name": "NASA_BREAKING", "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss"}
        ],
        "DEFENSE_SPACE": [
            {"name": "BREAKING_DEFENSE_SPACE", "url": "https://breakingdefense.com/category/space/feed/"}
        ]
    },
    "CYBER_INTELLIGENCE": {
        "THREAT_ADVISORIES": [
            {"name": "CISA_ALERTS", "url": "https://www.cisa.gov/cybersecurity-advisories/all.xml"},
            {"name": "HACKER_NEWS_RAW", "url": "https://news.ycombinator.com/rss"}
        ],
        "EXPLOIT_TRACKERS": [
            {"name": "BLEEPING_COMPUTER", "url": "https://www.bleepingcomputer.com/feed/"},
            {"name": "KREBS_ON_SECURITY", "url": "https://krebsonsecurity.com/feed/"}
        ]
    }
}

def clean_summary(text):
    """Removes HTML tags and truncates to 400 characters for the UI."""
    clean = re.sub(r'<[^>]+>', '', text)
    return clean[:400] + "..." if len(clean) > 400 else clean

def fetch_all_signals():
    tree = {"industries": []}

    for ind_name, categories in MASTER_CONFIG.items():
        industry_node = {"name": ind_name, "categories": []}
        
        for cat_name, feeds in categories.items():
            category_node = {"name": cat_name, "feeds": []}
            
            for feed_info in feeds:
                print(f"POLLING_SOURCE: {feed_info['name']}...")
                
                try:
                    # Timeout added to prevent dead feeds from hanging the GitHub Action
                    parsed = feedparser.parse(feed_info['url'])
                    feed_node = {"name": feed_info['name'], "articles": []}
                    
                    # Limit to the latest 15 articles per feed to keep JSON size manageable
                    for entry in parsed.entries[:15]:
                        
                        # Extract the best available date
                        date_val = datetime.now().strftime("%Y.%m.%d")
                        if hasattr(entry, 'published'):
                            date_val = entry.published
                        elif hasattr(entry, 'updated'):
                            date_val = entry.updated
                            
                        # Extract description safely
                        desc = entry.get('summary', entry.get('description', 'NO_DESCRIPTION_AVAILABLE_DECRYPT_VIA_RAW_SOURCE'))
                        
                        feed_node["articles"].append({
                            "id": f"GS-{hash(entry.link) % 100000}",
                            "title": entry.title.upper(),
                            "description": clean_summary(desc),
                            "source_url": entry.link,
                            "timestamp": date_val
                        })
                    
                    category_node["feeds"].append(feed_node)
                except Exception as e:
                    print(f"UPLINK_FAILED for {feed_info['name']}: {e}")
                    
            industry_node["categories"].append(category_node)
        tree["industries"].append(industry_node)

    # Save directly to signals.js for the frontend to consume
    with open("signals.js", "w", encoding="utf-8") as f:
        f.write(f"const signalTree = {json.dumps(tree, indent=4)};\n")
    
    print("UPLINK_COMPLETE: Hierarchical data tree generated successfully.")

if __name__ == "__main__":
    fetch_all_signals()
