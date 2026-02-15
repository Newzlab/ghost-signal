/* --- GHOST SIGNAL | TERMINAL CORE v3.0 (MOBILE INTERACTION PATCH) --- */

window.onload = () => { if (typeof db !== 'undefined') showAll(); };

function showAll() { 
    // Clear active states on sidebar when showing all
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    renderDirectory(db, "ALL_SIGNALS"); 
}

// SURGICAL PATCH: Unified Mobile Navigation Logic
function toggleNav() {
    const body = document.getElementById('main-body');
    body.classList.toggle('sidebar-active-right');
    // If we are closing the menu, clean up the directory state
    if (!body.classList.contains('sidebar-active-right')) {
        body.classList.remove('directory-open');
    }
}

function filterSignals(category) {
    // Update active class on sidebar modules
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    
    // Find the clicked module to apply the active highlight
    const modules = document.querySelectorAll('.intel-module');
    modules.forEach(m => {
        if (m.getAttribute('onclick') && m.getAttribute('onclick').includes(category)) {
            m.classList.add('active-module');
        }
    });

    // Elastic filter checks both type and cat_code to bridge Python/JS labels
    const filtered = db.filter(item => 
        item.type === category || 
        item.cat_code === category
    );
    
    renderDirectory(filtered, category);

    // SURGICAL PATCH: Fix for Problem #3 (Mobile Interaction)
    if (window.innerWidth <= 1024) {
        const body = document.getElementById('main-body');
        
        // 1. Close the filter sidebar so results are visible
        body.classList.remove('sidebar-active-right');
        
        // 2. Ensure directory is flagged as open (for layout logic)
        body.classList.add('directory-open');
        
        // 3. Scroll user to the directory list immediately
        setTimeout(() => {
            const vault = document.getElementById('vault-title');
            if (vault) vault.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    document.getElementById('vault-title').innerText = `SIGNAL_DIRECTORY // ${label}`;
    container.innerHTML = '';
    
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        const code = item.cat_code || "DECK";
        div.innerHTML = `<span style="color: var(--orange); font-size: 0.7rem; font-weight:700;">[${code}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    const words = item.description ? item.description.split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(words / 180));

    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type}`;
    document.getElementById('active-title').innerText = item.title;
    
    // Reset scroll position of center stage when switching articles
    document.getElementById('center-stage-anchor').scrollTop = 0;

    const meta = `
        <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 700;">
            <span>SOURCE: <span style="color: var(--orange);">${item.source.toUpperCase()}</span></span>
            <span>EST_READ: <span style="color: var(--orange);">${readTime} MIN</span></span>
            <span>DATE: <span style="color: var(--orange);">${item.timestamp}</span></span>
        </div>
    `;
    
    document.getElementById('active-description').innerHTML = meta + item.description + "...";
    document.getElementById('player-zone').innerHTML = `<button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px;">ACCESS RAW DATA SOURCE</button>`;

    // Close all mobile menus after selecting a signal to focus on content
    document.getElementById('main-body').classList.remove('sidebar-active-right', 'directory-open');
}

// --- HARDENED AUDIO LOGIC ---
let audioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('play-trigger');
    
    if (!audioPlaying) {
        audio.play().then(() => {
            btn.innerText = "TERMINATE_AUDIO";
            btn.style.color = "#ff0000";
            audioPlaying = true;
        }).catch(err => {
            console.error("Audio Blocked: ", err);
            btn.innerText = "UPLINK_FAILED_RETRY";
        });
    } else {
        audio.pause();
        btn.innerText = "INITIALIZE_AUDIO";
        btn.style.color = "var(--orange)";
        audioPlaying = false;
    }
}

function openManifesto() {
    document.getElementById('manifesto-overlay').style.display = 'flex';
}

function closeManifesto() {
    document.getElementById('manifesto-overlay').style.display = 'none';
}
