/* --- GHOST SIGNAL | NAVIGATION ENGINE v4.0 --- */

let navStack = []; // Tracks where the user is: [Industry, Category, Feed]

window.onload = () => {
    if (typeof signalTree !== 'undefined') {
        renderLevel("INDUSTRY", signalTree.industries);
    }
};

/**
 * Renders a specific level in the left sidebar
 * @param {string} type - INDUSTRY, CATEGORY, or FEED
 * @param {Array} items - The data to render
 */
function renderLevel(type, items) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    
    // Update the Sidebar Title with a Breadcrumb feel
    title.innerText = `SIGNAL_DIRECTORY // ${type}`;
    container.innerHTML = '';

    // Add a BACK button if we aren't at the root level
    if (navStack.length > 0) {
        const backBtn = document.createElement('div');
        backBtn.className = 'vault-item back-trigger';
        backBtn.innerHTML = `<span style="color: var(--orange);"><< RETURN_TO_PREVIOUS</span>`;
        backBtn.onclick = () => goBack();
        container.appendChild(backBtn);
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        
        // Visual indicator of what's inside
        const suffix = type === "FEED" ? `[${item.articles.length}]` : ">>";
        div.innerHTML = `${item.name} <span style="float:right; opacity:0.5;">${suffix}</span>`;
        
        div.onclick = () => {
            if (type === "INDUSTRY") {
                navStack.push(item);
                renderLevel("CATEGORY", item.categories);
            } else if (type === "CATEGORY") {
                navStack.push(item);
                renderLevel("FEED", item.feeds);
            } else if (type === "FEED") {
                displayFeedArticles(item);
            }
        };
        container.appendChild(div);
    });
}

function goBack() {
    navStack.pop();
    if (navStack.length === 0) {
        renderLevel("INDUSTRY", signalTree.industries);
    } else if (navStack.length === 1) {
        renderLevel("CATEGORY", navStack[0].categories);
    }
}

/**
 * Renders the list of articles from a specific feed into the CENTER CONSOLE
 */
function displayFeedArticles(feed) {
    const centerStage = document.getElementById('center-stage-anchor');
    const playerZone = document.getElementById('player-zone');
    
    // Clear previous article content
    document.getElementById('active-title').innerText = feed.name;
    document.getElementById('active-description').innerHTML = `Select a packet from the decrypted stream below to begin analysis.`;
    playerZone.innerHTML = '';

    // Create a list of articles in the center stage
    const listContainer = document.createElement('div');
    listContainer.className = 'article-stream';
    listContainer.style.textAlign = "left";
    listContainer.style.marginTop = "30px";

    feed.entries.forEach(article => {
        const artDiv = document.createElement('div');
        artDiv.className = 'vault-item'; // Reusing your existing style
        artDiv.style.border = "1px solid var(--border)";
        artDiv.style.marginBottom = "10px";
        artDiv.innerHTML = `
            <div style="font-size: 0.6rem; color: var(--orange);">${article.timestamp}</div>
            <div style="font-weight: 700; margin: 5px 0;">${article.title}</div>
            <div style="font-size: 0.75rem; opacity: 0.7;">${article.description.substring(0, 100)}...</div>
        `;
        artDiv.onclick = () => decryptSignal(article);
        listContainer.appendChild(artDiv);
    });

    centerStage.appendChild(listContainer);
}
