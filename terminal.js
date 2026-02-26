/* --- GHOST SIGNAL x DEAD HAND RADIO | MATRIX ENGINE v6.0 --- */

let navStack = []; 
let currentFeedData = null; 

// --- THEME ENGINE ---
function initTheme() {
    const savedTheme = localStorage.getItem('ghostTheme');
    if (savedTheme === 'cyan') {
        document.body.classList.add('theme-cyan');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('theme-cyan')) {
        document.body.classList.remove('theme-cyan');
        localStorage.setItem('ghostTheme', 'orange');
    } else {
        document.body.classList.add('theme-cyan');
        localStorage.setItem('ghostTheme', 'cyan');
    }
}

// --- LOCAL STORAGE MEMORY ENGINE (OSINT) ---
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

// --- BOOT SEQUENCE ---
window.onload = () => {
    initTheme();
    console.log("TERMINAL_UPLINK: Matrix Stable.");
    resetUplink(); // Starts at the Master Menu
};

window.addEventListener('popstate', (event) => {
    if (navStack.length > 0) {
        const prev = navStack.pop();
        if (prev.type === "ROOT") resetUplink();
        else renderLevel(prev.type, prev.data);
    } else {
        resetUplink();
    }
});

// --- NAVIGATION ENGINE ---
function resetUplink() {
    navStack = []; 
    history.pushState({ level: "ROOT" }, ""); 
    
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    
    title.innerHTML = `MASTER_DIRECTORY<br><div style="margin-top: 15px; font-size: 0.65rem; line-height: 1.4; letter-spacing: 1px; font-family: 'Orbitron'; color: var(--orange); opacity: 0.8;">// SELECT_DATA_STREAM</div>`;
    container.innerHTML = '';

    // Menu Item 1: OSINT TEXT
    const osintBtn = document.createElement('div');
    osintBtn.className = 'vault-item';
    osintBtn.innerHTML = `> [01] TEXT_INTERCEPTS <span style="float:right; opacity:0.4;">(OSINT)</span>`;
    osintBtn.onclick = () => {
        history.pushState({ level: "INDUSTRY" }, "");
        navStack.push({type: "ROOT", data: null, label: "ROOT"});
        if (typeof signalTree !== 'undefined') renderLevel("INDUSTRY", signalTree.industries);
        else container.innerHTML = '<div style="color:red;">ERROR: signals.js not loaded.</div>';
    };
    container.appendChild(osintBtn);

    // Menu Item 2: DHR AUDIO
    const dhrBtn = document.createElement('div');
    dhrBtn.className = 'vault-item';
    dhrBtn.innerHTML = `> [02] AUDIO_INTERCEPTS <span style="float:right; opacity:0.4;">(DHR)</span>`;
    dhrBtn.onclick = () => {
        history.pushState({ level: "DHR" }, "");
        navStack.push({type: "ROOT", data: null, label: "ROOT"});
        if (typeof db !== 'undefined') loadDHRTimeline();
        else container.innerHTML = '<div style="color:red;">ERROR: episodes.js not loaded.</div>';
    };
    container.appendChild(dhrBtn);
    
    // Reset Center Stage
    document.getElementById('label-type').innerText = "AWAITING_COORDINATES";
    document.getElementById('active-title').innerText = "INITIALIZING...";
    document.getElementById('active-description').innerHTML = `
        <div class="visualizer" style="margin-bottom: 25px;">
            <div class="v-bar"></div><div class="v-bar" style="animation-delay: 0.2s"></div>
            <div class="v-bar" style="animation-delay: 0.4s"></div><div class="v-bar" style="animation-delay: 0.1s"></div>
            <div class="v-bar" style="animation-delay: 0.3s"></div>
        </div>
        <div style="text-align: left; background: rgba(0,0,0,0.4); padding: 20px; border: 1px solid var(--border); border-radius: 4px;">
            <p style="margin-top: 0;"><strong>GHOST SIGNAL</strong> is a unified Intelligence Terminal. It aggregates automated OSINT decrypts from global defense nodes and intercepts classified audio transmissions via Dead Hand Radio.</p>
            <h3 style="color: var(--orange); font-family: 'Orbitron'; font-size: 0.85rem; margin-top: 25px; border-bottom: 1px dashed var(--border); padding-bottom: 5px; letter-spacing: 1px;">// OPERATION MANUAL</h3>
            <ul style="list-style-type: square; padding-left: 20px; font-size: 0.85rem; margin-bottom: 0;">
                <li style="margin-bottom: 12px;"><strong>TEXT_INTERCEPTS:</strong> Drill down through the OSINT directory to read AI-summarized defense and cyber briefs.</li>
                <li style="margin-bottom: 12px;"><strong>AUDIO_INTERCEPTS:</strong> Access the complete Dead Hand Radio database. Play podcasts or view video transmissions directly in the console.</li>
                <li><strong>BACKGROUND_MONITOR:</strong> Initialize random atmospheric audio in the right-hand panel to listen to archived transmissions while you read.</li>
            </ul>
        </div>
    `;
    document.getElementById('player-zone').innerHTML = '';
}

// --- OSINT RENDERING ---
function renderLevel(type, items) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    if (!container) return;

    let breadcrumb = `<div style="color: #fff; opacity: 0.5; cursor: pointer;" onclick="resetUplink()">// ROOT_DIRECTORY</div>`;
    if (navStack.length > 0) {
        breadcrumb = `<div style="color: var(--orange); opacity: 0.8; cursor: pointer; text-decoration: underline;" onclick="resetUplink()">// ROOT_DIRECTORY</div>`;
        navStack.forEach((step) => {
            if (step.label !== "ROOT") breadcrumb += `<div style="color: #fff; opacity: 0.5; margin-top: 5px;">> ${step.label}</div>`;
        });
    }
    
    title.innerHTML = `OSINT_DATALINK<br><div style="margin-top: 15px; font-size: 0.65rem; line-height: 1.4; letter-spacing: 1px; font-family: 'Orbitron';">${breadcrumb}</div>`;
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

    // Add Back Button
    const backBtn = document.createElement('div');
    backBtn.className = 'vault-item back-btn';
    backBtn.style.color = "var(--orange)";
    backBtn.style.fontWeight = "700";
    backBtn.style.marginTop = "10px";
    backBtn.innerHTML = `<< RETURN_TO_PREVIOUS`;
    backBtn.onclick = () => history.back();
    container.appendChild(backBtn);
}

function renderArticleList(feed) {
    currentFeedData = feed;
    const descriptionArea = document.getElementById('active-description');
    
    const fullPath = navStack.map(step => step.label).filter(l => l !== "ROOT").join(" // ");
    document.getElementById('label-type').innerText = fullPath;
    document.getElementById('active-title').innerText = feed.name;
    
    let sortedArticles = [...feed.articles].sort((a, b) => {
        const aRead = isRead(a.source_url) ? 1 : 0;
        const bRead = isRead(b.source_url) ? 1 : 0;
        if (aRead !== bRead) return aRead - bRead; 
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
        <div class="sticky-back-btn" onclick="renderArticleList(currentFeedData)"><< RETURN_TO_FEED_LIST</div>
        <div style="font-size:0.7rem; color:var(--orange); margin-bottom:15px; border-bottom:1px solid var(--border); padding-bottom:5px;">ORIGIN: ${art.timestamp}</div>
        <div class="decrypted-text" style="line-height:1.6; text-align: left;">${art.description}</div>
    `;
    document.getElementById('player-zone').innerHTML = `
        <button class="action-btn" onclick="window.open('${art.source_url}', '_blank')" style="width:100%; padding: 15px;">ACCESS_RAW_DATA</button>
    `;
}

// --- DHR RENDERING ---
function loadDHRTimeline() {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    
    let breadcrumb = `<div style="color: var(--orange); opacity: 0.8; cursor: pointer; text-decoration: underline;" onclick="resetUplink()">// ROOT_DIRECTORY</div>`;
    title.innerHTML = `DEAD_HAND_RADIO<br><div style="margin-top: 15px; font-size: 0.65rem; line-height: 1.4; letter-spacing: 1px; font-family: 'Orbitron';">${breadcrumb}</div>`;
    container.innerHTML = '';

    const displayDb = [...db].reverse(); 
    const chunkSize = 20;
    
    for (let i = 0; i < displayDb.length; i += chunkSize) {
        const chunk = displayDb.slice(i, i + chunkSize);
        const topId = chunk[0].id;
        const bottomId = chunk[chunk.length - 1].id;
        
        const folder = document.createElement('div');
        folder.className = 'accordion-folder';
        folder.innerHTML = `<span>+ ARCHIVE ${bottomId} - ${topId}</span>`;
        
        const list = document.createElement('div');
        list.className = 'episode-list';
        
        chunk.forEach(ep => {
            const item = document.createElement('div');
            item.className = 'vault-item';
            item.innerText = `> ${ep.id}: ${ep.title}`;
            item.onclick = () => mountMedia(ep.id);
            list.appendChild(item);
        });

        folder.onclick = () => {
            const isVisible = list.style.display === 'flex';
            document.querySelectorAll('.episode-list').forEach(el => el.style.display = 'none');
            list.style.display = isVisible ? 'none' : 'flex';
        };

        container.appendChild(folder);
        container.appendChild(list);
    }

    const backBtn = document.createElement('div');
    backBtn.className = 'vault-item back-btn';
    backBtn.style.color = "var(--orange)";
    backBtn.style.fontWeight = "700";
    backBtn.style.marginTop = "10px";
    backBtn.innerHTML = `<< RETURN_TO_PREVIOUS`;
    backBtn.onclick = () => history.back();
    container.appendChild(backBtn);
}

function mountMedia(id) {
    const ep = db.find(e => e.id === id);
    if (!ep) return;

    // COLLISION DETECTION: Kill background radio if user starts specific media
    if (bgPlaying) toggleRandomAudio();

    document.getElementById('active-title').innerText = ep.title.toUpperCase();
    document.getElementById('label-type').innerText = "AUDIO_INTERCEPT // " + ep.type.toUpperCase();
    document.getElementById('active-description').innerText = ep.summary || "Archived Transmission retrieved from database.";
    
    const playerZone = document.getElementById('player-zone');

    if (ep.media === 'video') {
        let videoId = (ep.audio_url.includes('v=')) ? ep.audio_url.split('v=')[1].split('&')[0] : ep.audio_url.split('/').pop();
        playerZone.innerHTML = `
            <div style="width:100%; aspect-ratio:16/9; border: 1px solid var(--border); background:#000; margin-top:20px;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>`;
    } else {
        playerZone.innerHTML = `
            <div id="audio-container" style="width:100%; margin-top:20px;">
                <audio id="main-audio" controls autoplay style="width:100%; filter: invert(100%) hue-rotate(150deg) brightness(1.5);">
                    <source src="${ep.audio_url}" type="audio/mpeg">
                </audio>
            </div>`;
    }
    
    if (window.innerWidth <= 1024) document.body.classList.remove('nav-open');
}

// --- BACKGROUND DEAD HAND ROULETTE ---
let bgAudio = new Audio();
let bgPlaying = false;
let currentRandomEp = null;

function toggleRandomAudio() {
    const btn = document.getElementById('play-trigger');
    const statusLabel = document.getElementById('audio-status-label');
    
    if (!bgPlaying) {
        // If we don't have a track loaded, or the track ended, pick a new random one
        if (!bgAudio.src || bgAudio.ended) {
            if (typeof db === 'undefined') {
                statusLabel.innerText = "ERROR: AUDIO_DB_OFFLINE";
                return;
            }
            const directEps = db.filter(ep => ep.media === 'direct');
            currentRandomEp = directEps[Math.floor(Math.random() * directEps.length)];
            bgAudio.src = currentRandomEp.audio_url;
            bgAudio.onended = () => { bgPlaying = false; toggleRandomAudio(); }; // Auto-play next random when done
        }
        
        bgAudio.play().catch(() => console.log("Audio blocked by browser"));
        btn.innerText = "TERMINATE_AUDIO";
        btn.style.background = "var(--orange)";
        btn.style.color = "#000";
        statusLabel.innerText = "PLAYING: " + currentRandomEp.title;
        statusLabel.style.color = "var(--orange)";
        bgPlaying = true;
    } else {
        bgAudio.pause();
        btn.innerText = "RESUME_RANDOM_AUDIO";
        btn.style.background = "transparent";
        btn.style.color = "var(--orange)";
        statusLabel.innerText = "PAUSED: " + currentRandomEp.title;
        statusLabel.style.color = "#fff";
        bgPlaying = false;
    }
}

// --- MOBILE DRAWER TOGGLE ---
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
