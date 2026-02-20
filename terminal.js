/* --- GHOST SIGNAL | NAVIGATION ENGINE v4.3 --- */

let navStack = []; 

window.onload = () => {
    console.log("TERMINAL_UPLINK: Status Stable.");
    if (typeof signalTree !== 'undefined') {
        renderLevel("INDUSTRY", signalTree.industries);
    } else {
        console.error("DATA_ERROR: signalTree not found.");
    }
};

function renderLevel(type, items) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    if (!container) return;

    // --- BREADCRUMB LOGIC (The "Where am I" Fix) ---
    let breadcrumb = `<div style="color: #fff; opacity: 0.5;">// ROOT_DIRECTORY</div>`;
    if (navStack.length > 0) {
        breadcrumb = "";
        navStack.forEach((step) => {
            breadcrumb += `<div style="color: #fff; opacity: 0.5; margin-top: 5px;">> ${step.label}</div>`;
        });
        // Highlights the current level you are selecting
        breadcrumb += `<div style="color: var(--orange); margin-top: 5px;">> SELECT_${type}</div>`;
    }
    
    // Inject the breadcrumb path into the sidebar title area
    title.innerHTML = `SIGNAL_DIRECTORY<br><div style="margin-top: 15px; font-size: 0.65rem; line-height: 1.4; letter-spacing: 1px; font-family: 'Orbitron';">${breadcrumb}</div>`;
    
    container.innerHTML = '';

    // Add BACK button
    if (navStack.length > 0) {
        const backBtn = document.createElement('div');
        backBtn.className = 'vault-item back-btn';
        backBtn.style.color = "var(--orange)";
        backBtn.style.fontWeight = "700";
        backBtn.innerHTML = `<< RETURN_TO_PREVIOUS`;
        backBtn.onclick = () => goBack();
        container.appendChild(backBtn);
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        const icon = type === "FEED" ? `[${item.articles.length}]` : "»";
        div.innerHTML = `${item.name} <span style="float:right; opacity:0.4;">${icon}</span>`;
        
        div.onclick = () => {
            if (type === "INDUSTRY") {
                // We now save the "label" (name) so we can build the breadcrumb
                navStack.push({type: "INDUSTRY", data: items, label: item.name});
                renderLevel("CATEGORY", item.categories);
            } else if (type === "CATEGORY") {
                navStack.push({type: "CATEGORY", data: items, label: item.name});
                renderLevel("FEED", item.feeds);
            } else if (type === "FEED") {
                renderArticleList(item);
            }
        };
        container.appendChild(div);
    });
}

function goBack() {
    const prev = navStack.pop();
    renderLevel(prev.type, prev.data);
}

function renderArticleList(feed) {
    const descriptionArea = document.getElementById('active-description');
    
    // Show the full path in the center stage header
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
    document.getElementById('active-description').innerHTML = `
        <div style="font-size:0.7rem; color:var(--orange); margin-bottom:15px; border-bottom:1px solid var(--border); padding-bottom:5px;">
            ORIGIN: ${art.timestamp}
        </div>
        <div class="decrypted-text" style="line-height:1.6;">${art.description}</div>
    `;
    document.getElementById('player-zone').innerHTML = `
        <button class="action-btn" onclick="window.open('${art.source_url}', '_blank')" style="width:100%">ACCESS_RAW_DATA</button>
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
