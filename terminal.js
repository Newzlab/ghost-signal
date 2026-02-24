/* --- GHOST SIGNAL | NAVIGATION ENGINE v5.0 (STABLE) --- */

let navStack = []; 
let currentFeedData = null; 

// --- LOCAL STORAGE MEMORY ENGINE ---
function markAsRead(url) {
    let readArticles = JSON.parse(localStorage.getItem('ghostSignalRead')) || [];
    if (!readArticles.includes(url)) {
        readArticles.push(url);
        if (readArticles.length > 1000) readArticles.shift(); 
        localStorage.setItem('ghostSignalRead', JSON.stringify(readArticles));
    }
}

function isRead(url) {
    let readArticles = JSON.parse(localStorage.getItem('ghostSignalRead')) || [];
    return readArticles.includes(url);
}
// -----------------------------------

window.onload = () => {
    console.log("TERMINAL_UPLINK: Status Stable.");
    history.replaceState({ level: "ROOT" }, "");

    if (typeof signalTree !== 'undefined') {
        renderLevel("INDUSTRY", signalTree.industries);
    } else {
        console.error("DATA_ERROR: signalTree not found.");
    }
};

window.addEventListener('popstate', (event) => {
    if (navStack.length > 0) {
        const prev = navStack.pop();
        renderLevel(prev.type, prev.data);
    }
});

function resetUplink() {
    navStack = []; 
    history.pushState({ level: "ROOT" }, ""); 
    
    renderLevel("INDUSTRY", signalTree.industries);
    
    document.getElementById('label-type').innerText = "AWAITING_COORDINATES";
    document.getElementById('active-title').innerText = "INITIALIZING...";
    
    document.getElementById('active-description').innerHTML = `
        <div class="visualizer" style="margin-bottom: 25px;">
            <div class="v-bar"></div>
            <div class="v-bar" style="animation-delay: 0.2s"></div>
            <div class="v-bar" style="animation-delay: 0.4s"></div>
        </div>
        
        <div style="text-align: left; background: rgba(0,0,0,0.4); padding: 20px; border: 1px solid var(--border); border-radius: 4px;">
            <p style="margin-top: 0;"><strong>GHOST SIGNAL</strong> is an automated Open Source Intelligence (OSINT) aggregator. It autonomously monitors high-priority defense, aerospace, and cyber nodes, utilizes deep-scraping to bypass publisher truncation, and leverages an AI analyst to synthesize raw data into actionable intelligence briefs.</p>
            
            <h3 style="color: var(--orange); font-family: 'Orbitron'; font-size: 0.85rem; margin-top: 25px; border-bottom: 1px dashed var(--border); padding-bottom: 5px; letter-spacing: 1px;">// OPERATION MANUAL</h3>
            <ul style="list-style-type: square; padding-left: 20px; font-size: 0.85rem; margin-bottom: 0;">
                <li style="margin-bottom: 12px;"><strong>NAVIGATE:</strong> Select an industry node from the left directory to begin the decryption sequence. Drill down through categories to access specific intelligence feeds.</li>
                <li style="margin-bottom: 12px;"><strong>CONSUME:</strong> Unread signals are automatically prioritized at the top of your feed. Viewed intelligence is greyed out and drops to the bottom of the ledger.</li>
                <li><strong>RESET:</strong> Click <span style="color: var(--orange); font-weight: bold;">[RESET_UPLINK]</span> or the root directory breadcrumb at any time to clear the terminal and return to this screen.</li>
            </ul>
        </div>
    `;
    document.getElementById('player-zone').innerHTML = '';
}

function renderLevel(type, items) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    if (!container) return;

    let breadcrumb = `<div style="color: #fff; opacity: 0.5; cursor: pointer;" onclick="resetUplink()">// ROOT_DIRECTORY</div>`;
    if (navStack.length > 0) {
        breadcrumb = `<div style="color: var(--orange); opacity: 0.8; cursor: pointer; text-decoration: underline;" onclick="resetUplink()">// ROOT_DIRECTORY</div>`;
        navStack.forEach((step) => {
            breadcrumb += `<div style="color: #fff; opacity: 0.5; margin-top: 5px;">> ${step.label}</div>`;
        });
    }
    
    title.innerHTML = `SIGNAL_DIRECTORY<br><div style="margin-top: 15px; font-size: 0.65rem; line-height: 1.4; letter-spacing: 1px; font-family: 'Orbitron';">${breadcrumb}</div>`;
    container.innerHTML = '';

    const selectPrompt = document.createElement('div');
    selectPrompt.className = 'vault-item';
    selectPrompt.style.color = "var(--orange)";
    selectPrompt.style.fontWeight = "700";
    selectPrompt.style.cursor = "default";
    selectPrompt.style.borderBottom = "1px dashed var(--orange)";
    selectPrompt.innerHTML = `> SELECT_${type}`;
    container.appendChild(selectPrompt);

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        const icon = type === "FEED" ? `[${item.articles.length}]` : "»";
        div.innerHTML = `${item.name} <span style="float:right; opacity:0.4;">${icon}</span>`;
        
        div.onclick = () => {
            if (type === "INDUSTRY") {
                history.pushState({ level: "CATEGORY" }, "");
                navStack.push({type: "INDUSTRY", data: items, label: item.name});
                renderLevel("CATEGORY", item.categories);
            } else if (type === "CATEGORY") {
                history.pushState({ level: "FEED" }, "");
                navStack.push({type: "CATEGORY", data: items, label: item.name});
                renderLevel("FEED", item.feeds);
            } else if (type === "FEED") {
                renderArticleList(item);
            }
        };
        container.appendChild(div);
    });

    if (navStack.length > 0) {
        const backBtn = document.createElement('div');
        backBtn.className = 'vault-item back-btn';
        backBtn.style.color = "var(--orange)";
        backBtn.style.fontWeight = "700";
        backBtn.style.marginTop = "10px";
        backBtn.innerHTML = `<< RETURN_TO_PREVIOUS`;
        backBtn.onclick = () => history.back();
        container.appendChild(backBtn);
    }
}

function renderArticleList(feed) {
    currentFeedData = feed;
    const descriptionArea = document.getElementById('active-description');
    
    const fullPath = navStack.map(step => step.label).join(" // ");
    document.getElementById('label-type').innerText = fullPath;
    document.getElementById('active-title').innerText = feed.name;
    
    let sortedArticles = [...feed.articles].sort((a, b) => {
        const aRead = isRead(a.source_url) ? 1 : 0;
        const bRead = isRead(b.source_url) ? 1 : 0;

        if (aRead !== bRead) {
            return aRead - bRead; 
        }
        return b.timestamp.localeCompare(a.timestamp);
    });

    let html = `<div class="article-list" style="text-align:left; margin-top:20px;">`;
    sortedArticles.forEach(art => {
        const blob = btoa(encodeURIComponent(JSON.stringify(art)));
        const readClass = isRead(art.source_url) ? ' read-article' : '';
        
        html += `
            <div class="vault-item${readClass}" onclick="viewArticle('${blob}')" style="border:1px solid var(--border); margin-bottom:10px;">
                <span style="font-size:0.6rem; color:var(--orange)">${art.timestamp}</span>
                <div style="font-weight:700;">${art.title}</div>
            </div>`;
    });
    html += `</div>`;
    descriptionArea.innerHTML = html;
    
    if (window.innerWidth <= 1024) document.body.classList.remove('nav-open');
}

function viewArticle(blob) {
    const art = JSON.parse(decodeURIComponent(atob(blob)));
    
    markAsRead(art.source_url);

    document.getElementById('active-title').innerText = art.title;
    
    document.getElementById('active-description').innerHTML = `
        <div class="sticky-back-btn" onclick="renderArticleList(currentFeedData)">
            << RETURN_TO_FEED_LIST
        </div>
        <div style="font-size:0.7rem; color:var(--orange); margin-bottom:15px; border-bottom:1px solid var(--border); padding-bottom:5px;">
            ORIGIN: ${art.timestamp}
        </div>
        <div class="decrypted-text" style="line-height:1.6; text-align: left;">${art.description}</div>
    `;
    
    document.getElementById('player-zone').innerHTML = `
        <button class="action-btn" onclick="window.open('${art.source_url}', '_blank')" style="width:100%; padding: 15px;">ACCESS_RAW_DATA</button>
    `;
}

function toggleNav(side) {
    const body = document.body;
    if (side === 'left') {
        body.classList.toggle('nav-open');
        body.classList.remove('hub-open');
    } else {
        body.classList.toggle('hub-open');
        body.classList.remove('nav-open');
    }
}

let audioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('play-trigger');
    if (!audioPlaying) {
        audio.play().catch(() => console.log("Audio blocked by browser"));
        btn.innerText = "TERMINATE_AUDIO";
        audioPlaying = true;
    } else {
        audio.pause();
        btn.innerText = "INITIALIZE_AUDIO";
        audioPlaying = false;
    }
}
