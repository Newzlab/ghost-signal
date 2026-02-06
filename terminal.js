/* --- GHOST SIGNAL | TERMINAL CORE v2.0 --- */

// On Load: Populate the directory with all signals
window.onload = () => {
    showAll();
};

function showAll() {
    renderDirectory(db, "ALL_SIGNALS");
}

// Logic to filter the left sidebar based on right sidebar clicks
function filterSignals(category) {
    const filtered = db.filter(item => item.type === category);
    renderDirectory(filtered, category);
}

// Grouping and Rendering Logic
function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    
    title.innerText = `SIGNAL_DIRECTORY // ${label}`;
    container.innerHTML = '';
    
    if (data.length === 0) {
        container.innerHTML = `<div class="vault-item" style="opacity: 0.5;">NO_SIGNALS_FOUND_IN_CATEGORY</div>`;
        return;
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        // We'll show the source name in brackets for quick scanning
        div.innerHTML = `<span style="color: var(--orange); font-size: 0.7rem;">[${item.source}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

// Data Decryption Logic (Center Console)
function decryptSignal(item) {
    // Top-bar metadata update
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type} // SOURCE: ${item.source}`;
    
    // Title Update
    document.getElementById('active-title').innerText = item.title;
    
    // Description + Timestamp
    const timestampHTML = `<div style="color: var(--orange); font-size: 0.8rem; margin-bottom: 20px; font-weight: 700;">TIMESTAMP: ${item.timestamp}</div>`;
    document.getElementById('active-description').innerHTML = timestampHTML + item.description;
    
    // Action Button
    const zone = document.getElementById('player-zone');
    zone.innerHTML = `
        <button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px;">
            ACCESS RAW DATA SOURCE
        </button>
    `;

    // Audio Cue Placeholder (Ready for our sound FX task next)
    console.log("SIGNAL_DECRYPTED: " + item.id);
}
