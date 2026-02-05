import feedparser
import json

# TARGETED HIGH-TRANSPARENCY SOURCES
FEEDS = {
    "HUMANITARIAN": "https://www.thenewhumanitarian.org/rss/all.xml",
    "GEOPOLITICS": "https://www.csis.org/rss/publications",
    "SYSTEMIC": "https://www.propublica.org/feeds/propublica/main",
    "ENVIRONMENT": "https://news.mongabay.com/feed/"
}

def fetch_and_format():
    signal_db = []
    for category, url in FEEDS.items():
        feed = feedparser.parse(url)
        for entry in feed.entries[:8]:
            signal_entry = {
                "id": f"GS-{entry.get('id', entry.link)[-5:]}",
                "title": entry.title.upper(),
                "type": category,
                "description": entry.get('summary', '')[:250] + "...",
                "source_url": entry.link
            }
            signal_db.append(signal_entry)

    with open("signals.js", "w") as f:
        f.write(f"const db = {json.dumps(signal_db, indent=4)};")

if __name__ == "__main__":
    fetch_and_format()
