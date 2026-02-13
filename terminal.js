/* --- GHOST SIGNAL | TERMINAL CORE v2.6 | 2026 STABLE --- */

// --- INITIALIZATION ---
window.onload = () => {
    if (typeof db !== 'undefined') {
        filterSignals('D_INT_DARK'); // Default to Defense Intel on boot
        // Slight delay for the startup alert to ensure DOM is ready
        setTimeout(() => triggerSystemAlert("UPLINK_ESTABLISHED: ENCRYPTED_FEED_ACTIVE"), 1000);
    }
};

// --- CORE LOGIC ---
function filterSignals(category) {
    console.log("UPLINK_REQUESTED:", category);

    // 1. Visually update the active module (Updated for Sidebar Reset)
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    
    const activeModule = Array.from(document.querySelectorAll('.intel-module'))
        .find(m => m.getAttribute('onclick').includes(category));
    
    if (activeModule) {
        activeModule.classList.add('active-module');
        // Trigger a red alert style toast if user clicks into Dark Intel
        if (category === 'D_INT_DARK') {
            triggerSystemAlert("CAUTION: ACCESSING_RESTRICTED_DEFENSE_FEEDS");
        }
    }

    // 2. The Smart Filter: Checks both the long-form type and the short cat_code
    const filtered = db.filter(item => {
        return item.type === category || item.cat_code === category;
    });

    if (filtered.length === 0) {
        console.warn("SIGNAL_VACUUM: No data for", category);
    }

    renderDirectory(filtered, category);
}

function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    const vaultTitle = document.getElementById('vault-title');
    
    if (vaultTitle) vaultTitle.innerText = `SIGNAL_DIRECTORY // ${label}`;
    if (!container) return;

    container.innerHTML = '';
    
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        const code = item.cat_code || "DECK";
        
        // Aesthetic: DARK sources get a red bracket in the list
        const codeColor = code === 'DARK' ? 'var(--alert-red)' : 'var(--orange)';
        
        div.innerHTML = `<span style="color: ${codeColor}; font-size: 0.7rem; font-weight:700;">[${code}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    const words = item.description ? item.description.split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(words / 180));

    // Reset center scroll position on new article
    const centerPanel = document.querySelector('.console-wrapper > .hud-panel:nth-child(2)');
    if (centerPanel) centerPanel.scrollTop = 0;

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
    document.getElementById('player-zone').innerHTML = `<button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px; width:100%;">ACCESS RAW DATA SOURCE</button>`;
}

// --- PHASE 2: SYSTEM ALERT LOGIC ---
function triggerSystemAlert(message) {
    const alertContainer = document.getElementById('alert-anchor'); // Ensure this div exists in your HTML
    if (!alertContainer) return;

    const toast = document.createElement('div');
    toast.className = 'alert-toast';
    toast.innerHTML = `
        <span style="font-weight:900;">[!]</span>
        <span>${message}</span>
    `;

    alertContainer.appendChild(toast);

    // Self-destruct after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// --- AUDIO CONTROLS ---
let audioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('play-trigger');
    if (!audio) return;
    
    if (!audioPlaying) {
        audio.play().then(() => {
            btn.innerText = "TERMINATE_AUDIO";
            btn.style.color = "var(--alert-red)";
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

// --- MODAL CONTROLS ---
function openManifesto() { document.getElementById('manifesto-overlay').style.display = 'flex'; }
function closeManifesto() { document.getElementById('manifesto-overlay').style.display = 'none'; }
