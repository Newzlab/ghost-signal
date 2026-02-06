/* --- GHOST SIGNAL | TERMINAL CORE v2.1 --- */

window.onload = () => { showAll(); };

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
    
    if (!data || data.length === 0) {
        container.innerHTML = `<div class="vault-item" style="opacity: 0.5;">NO_SIGNALS_DETECTED</div>`;
        return;
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        // USE THE 4-CHAR CODE HERE
        div.innerHTML = `<span style="color: var(--orange); font-size: 0.7rem; font-weight:700;">[${item.cat_code}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    // 1. Calculate reading time (Roughly 1 min per 200 words)
    // If the summary is short, we'll cap it at '1 MIN' minimum
    const words = item.description.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(words / 150)); 

    // 2. Update Header
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type}`;
    document.getElementById('active-title').innerText = item.title;
    
    // 3. Metadata Layout
    const metadata = `
        <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 700; color: var(--text-dim);">
            <span>SOURCE: <span style="color: var(--orange);">${item.source.toUpperCase()}</span></span>
            <span>EST_READ: <span style="color: var(--orange);">${readTime} MIN</span></span>
            <span>DATE: <span style="color: var(--orange);">${item.timestamp}</span></span>
        </div>
    `;
    
    document.getElementById('active-description').innerHTML = metadata + item.description + "...";
    
    // 4. Action Button
    const zone = document.getElementById('player-zone');
    zone.innerHTML = `<button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px;">ACCESS RAW DATA SOURCE</button>`;
}
