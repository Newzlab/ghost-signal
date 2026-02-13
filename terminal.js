/* --- GHOST SIGNAL | TERMINAL CORE v2.5 --- */

window.onload = () => { if (typeof db !== 'undefined') showAll(); };

function showAll() { renderDirectory(db, "ALL_SIGNALS"); }

function filterSignals(category) {
    console.log("UPLINK_REQUESTED:", category);

    // 1. Visually update the active module
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    const activeModule = Array.from(document.querySelectorAll('.intel-module'))
        .find(m => m.getAttribute('onclick').includes(category));
    if (activeModule) activeModule.classList.add('active-module');

    // 2. The Smart Filter: Checks both the long-form type and the short cat_code
    const filtered = db.filter(item => {
        return item.type === category || item.cat_code === category;
    });

    if (filtered.length === 0) {
        console.warn("SIGNAL_VACUUM: No data for", category);
    }

    renderDirectory(filtered, category);
}

// Ensure the directory renders on boot
window.onload = () => {
    if (typeof db !== 'undefined') {
        filterSignals('D_INT_DARK'); // Default to Defense Intel on boot
    }
};

function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    document.getElementById('vault-title').innerText = `SIGNAL_DIRECTORY // ${label}`;
    container.innerHTML = '';
    
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        // Use the new H+++ / CORP / VOID codes
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
    
    const meta = `
        <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 700;">
            <span>SOURCE: <span style="color: var(--orange);">${item.source.toUpperCase()}</span></span>
            <span>EST_READ: <span style="color: var(--orange);">${readTime} MIN</span></span>
            <span>DATE: <span style="color: var(--orange);">${item.timestamp}</span></span>
        </div>
    `;
    
    document.getElementById('active-description').innerHTML = meta + item.description + "...";
    document.getElementById('player-zone').innerHTML = `<button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px;">ACCESS RAW DATA SOURCE</button>`;
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


