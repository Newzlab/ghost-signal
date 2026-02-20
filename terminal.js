/* --- GHOST SIGNAL | NAVIGATION ENGINE v4.6 --- */

let navStack = []; 
let currentFeedData = null; // Memory variable to hold the active feed

window.onload = () => {
    console.log("TERMINAL_UPLINK: Status Stable.");
    
    // Set the initial "Root" state in the browser's history
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

function renderLevel(type, items) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    if (!container) return;

    // --- BREADCRUMB LOGIC ---
    let breadcrumb = `<div style="color: #fff; opacity: 0.5;">// ROOT_DIRECTORY</div>`;
    if (navStack.length > 0) {
        breadcrumb = "";
        navStack.forEach((step) => {
            breadcrumb += `<div style="color: #fff; opacity: 0.5; margin-top: 5px;">> ${step.label}</div>`;
        });
    }
    
    title.innerHTML = `SIGNAL_DIRECTORY<br><div style="margin-top: 15px; font-size: 0.65rem; line-height: 1.4; letter-spacing: 1px; font-family: 'Orbitron';">${breadcrumb}</div>`;
    container.innerHTML = '';

    // --- THE ACTION PROMPT ---
    const selectPrompt = document.createElement('div');
    selectPrompt.className = 'vault-item';
    selectPrompt.style.color = "var(--orange)";
    selectPrompt.style.fontWeight = "700";
    selectPrompt.style.cursor = "default";
    selectPrompt.style.borderBottom = "1px dashed var(--orange)";
    selectPrompt.innerHTML = `> SELECT_${type}`;
    container.appendChild(selectPrompt);

    // --- THE DATA LIST ---
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

    // --- THE BACK BUTTON ---
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
    currentFeedData = feed; // Save the feed to memory for the escape hatch
    const descriptionArea = document.getElementById('active-description');
    
    const fullPath = navStack.map(step => step.label).join(" // ");
    document.getElementById('label-type').innerText = fullPath;
    document.getElementById('active-title').innerText = feed.name;
    
    let html = `<div class="article-list" style="text-align:left; margin-top:20px;">`;
    feed.articles.forEach(art => {
        const blob = btoa(encodeURIComponent(JSON.stringify(art)));
        html += `
            <div class="vault-item" onclick="viewArticle('${blob}')" style="border:1px solid var(--border); margin-bottom:10px;">
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
    document.getElementById('active-title').innerText = art.title;
    
    // Injected sticky button at the top of the article text
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

// --- UTILS ---
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
