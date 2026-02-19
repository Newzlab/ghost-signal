let navStack = []; 

window.onload = () => {
    if (typeof signalTree !== 'undefined') {
        renderLevel("INDUSTRY", signalTree.industries);
    }
};

function renderLevel(type, items) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    title.innerText = `DIR // ${type}`;
    container.innerHTML = '';

    if (navStack.length > 0) {
        const backBtn = document.createElement('div');
        backBtn.className = 'vault-item back-btn';
        backBtn.innerHTML = `<span style="color:var(--orange)"><< BACK</span>`;
        backBtn.onclick = () => goBack();
        container.appendChild(backBtn);
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        const icon = type === "FEED" ? "•" : "»";
        div.innerHTML = `${item.name} <span style="float:right; opacity:0.4;">${icon}</span>`;
        
        div.onclick = () => {
            if (type === "INDUSTRY") {
                navStack.push({type: "INDUSTRY", data: items});
                renderLevel("CATEGORY", item.categories);
            } else if (type === "CATEGORY") {
                navStack.push({type: "CATEGORY", data: items});
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
    const stage = document.getElementById('terminal-view-area');
    document.getElementById('active-title').innerText = feed.name;
    document.getElementById('label-type').innerText = "FEED_STREAMS";
    
    let html = `<div class="article-list">`;
    feed.articles.forEach(art => {
        html += `
            <div class="article-snippet" onclick="viewArticle(${JSON.stringify(art).replace(/"/g, '&quot;')})">
                <span class="art-date">${art.timestamp}</span>
                <div class="art-title">${art.title}</div>
            </div>`;
    });
    html += `</div>`;
    stage.querySelector('#active-description').innerHTML = html;
    
    if (window.innerWidth <= 1024) document.body.classList.remove('nav-open');
}

function viewArticle(art) {
    document.getElementById('active-title').innerText = art.title;
    document.getElementById('active-description').innerHTML = `
        <div class="meta-row">ORIGIN: ${art.timestamp}</div>
        <div class="decrypted-text">${art.description}</div>
    `;
    document.getElementById('player-zone').innerHTML = `
        <button class="action-btn" onclick="window.open('${art.source_url}', '_blank')">ACCESS_RAW_DATA</button>
    `;
}

// --- SYSTEM UTILS ---
function toggleNav(side) {
    const body = document.body;
    if (side === 'left') body.classList.toggle('nav-open');
    else body.classList.toggle('hub-open');
}

let audioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('play-trigger');
    if (!audioPlaying) {
        audio.play();
        btn.innerText = "TERMINATE_AUDIO";
        audioPlaying = true;
    } else {
        audio.pause();
        btn.innerText = "INITIALIZE_AUDIO";
        audioPlaying = false;
    }
}
