import feedparser
import json
import re
from datetime import datetime

# --- CONFIGURATION: THE SOURCE TREE ---
# This defines your 4-level hierarchy. You can add or remove feeds here.
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
                        desc = entry.get('summary', entry.get('description', 'NO_DESCRIPTION_AVAILABLE'))
                        
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
