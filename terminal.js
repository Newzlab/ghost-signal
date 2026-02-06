/* --- GHOST SIGNAL | TERMINAL CORE v2.2 --- */

window.onload = () => { 
    if (typeof db !== 'undefined') {
        showAll(); 
    } else {
        document.getElementById('vault-content').innerHTML = "WAITING_FOR_UPLINK...";
    }
};

function showAll() { renderDirectory(db, "ALL_SIGNALS"); }

function filterSignals(category) {
    const filtered = db.filter(item => item.type === category);
    renderDirectory(filtered, category);
}

function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    title.innerText = `SIGNAL_DIRECTORY // ${label}`;
    container.innerHTML = '';
    
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        // Fallback for cat_code
        const code = item.cat_code || "OSINT";
        div.innerHTML = `<span style="color: var(--orange); font-size: 0.7rem; font-weight:700;">[${code}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    // 1. Logic for Reading Time
    const text = item.description || "";
    const words = text.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(words / 150));

    // 2. Map Variables (Double-checking keys match Python)
    const source = item.source || "UNKNOWN";
    const date = item.timestamp || "2026.02.05";
    const type = item.type || "SIGNAL";

    // 3. Update Text Content
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${type}`;
    document.getElementById('active-title').innerText = item.title;
    
    // 4. Inject Metadata and Description
    const metadataHTML = `
        <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 700;">
            <span>SOURCE: <span style="color: var(--orange);">${source.toUpperCase()}</span></span>
            <span>READ: <span style="color: var(--orange);">${readTime} MIN</span></span>
            <span>DATE: <span style="color: var(--orange);">${date}</span></span>
        </div>
    `;
    
    document.getElementById('active-description').innerHTML = metadataHTML + text + "...";
    
    // 5. Fix the Button
    const zone = document.getElementById('player-zone');
    const url = item.source_url || "#";
    zone.innerHTML = `<button class="action-btn" onclick="window.open('${url}', '_blank')" style="padding: 18px 50px;">ACCESS RAW DATA SOURCE</button>`;
}
