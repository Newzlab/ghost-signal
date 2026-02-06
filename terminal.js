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
        
        // Safety check: if source is missing, use 'UNKNOWN'
        const sourceLabel = item.source ? item.source : 'OSINT';
        
        div.innerHTML = `<span style="color: var(--orange); font-size: 0.7rem;">[${sourceLabel}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

// Data Decryption Logic (Center Console)
function decryptSignal(item) {
    // 1. Calculate reading time (avg 200 words per minute)
    const wordCount = item.description.split(' ').length;
    const readTime = Math.ceil(wordCount / 200);

    // 2. Update Header Metadata
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type}`;
    
    // 3. Update Title
    document.getElementById('active-title').innerText = item.title;
    
    // 4. Update Description with Intel Briefing style
    const intelMetadata = `
        <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700;">
            <span>SOURCE: <span style="color: var(--orange);">${item.source}</span></span>
            <span>EST_READ_TIME: <span style="color: var(--orange);">${readTime} MIN</span></span>
            <span>DATE: <span style="color: var(--orange);">${item.timestamp}</span></span>
        </div>
    `;
    
    document.getElementById('active-description').innerHTML = intelMetadata + item.description + "...";
    
    // 5. Action Button
    const zone = document.getElementById('player-zone');
    zone.innerHTML = `
        <button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px;">
            OPEN FULL INTELLIGENCE REPORT
        </button>
    `;
}


