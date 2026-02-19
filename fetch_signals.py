import feedparser
import json
import re
from datetime import datetime

# --- CONFIGURATION: THE SOURCE TREE ---
# This structure defines your NEW navigation levels
MASTER_CONFIG = {
    "DEFENSE_SYSTEMS": {
        "UNMANNED_AUTONOMY": [
            {"name": "SHIELD_AI", "url": "https://shield.ai/feed/"},
            {"name": "ANDURIL_NODE", "url": "https://www.anduril.com/news/feed/"}
        ],
        "R_AND_D": [
            {"name": "DARPA_WIRE", "url": "https://www.darpa.mil/news/rss"},
            {"name": "MIT_LINCOLN", "url": "https://www.ll.mit.edu/news/rss.xml"}
        ]
    },
    "AEROSPACE": {
        "ORBITAL_LOGISTICS": [
            {"name": "SPACE_NEWS", "url": "https://spacenews.com/feed/"}
        ]
    },
    "CYBER_INTELLIGENCE": {
        "THREAT_ADVISORIES": [
            {"name": "CISA_ALERTS", "url": "https://www.cisa.gov/cybersecurity-advisories/all.xml"}
        ]
    }
}

def clean_summary(text):
    return re.sub(r'<[^>]+>', '', text)[:400] + "..."

def fetch_all_signals():
    tree = {"industries": []}

    for ind_name, categories in MASTER_CONFIG.items():
        industry_node = {"name": ind_name, "categories": []}
        
        for cat_name, feeds in categories.items():
            category_node = {"name": cat_name, "feeds": []}
            
            for feed_info in feeds:
                print(f"FETCHING: {feed_info['name']}")
                parsed = feedparser.parse(feed_info['url'])
                
                feed_node = {
                    "name": feed_info['name'],
                    "articles": []
                }
                
                for entry in parsed.entries[:10]: # 10 articles per feed
                    # Attempt to get real date
                    date_str = datetime.now().strftime("%Y.%m.%d")
                    if hasattr(entry, 'published'):
                        date_str = entry.published # We can format this better later
                    
                    feed_node["articles"].append({
                        "id": f"GS-{hash(entry.link) % 10000}",
                        "title": entry.title.upper(),
                        "description": clean_summary(entry.get('summary', '')),
                        "source_url": entry.link,
                        "timestamp": date_str
                    })
                
                category_node["feeds"].append(feed_node)
            industry_node["categories"].append(category_node)
        tree["industries"].append(industry_node)

    # Save to signals.js
    with open("signals.js", "w") as f:
        f.write(f"const signalTree = {json.dumps(tree, indent=4)};")

if __name__ == "__main__":
    fetch_all_signals()
