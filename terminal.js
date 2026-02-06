// On Load: Populate the directory
window.onload = () => {
    showAll();
};

function showAll() {
    renderDirectory(db);
}

function filterSignals(category) {
    const filtered = db.filter(item => item.type === category);
    renderDirectory(filtered);
}

function renderDirectory(data) {
    const container = document.getElementById('vault-content');
    container.innerHTML = '';
    
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        div.innerHTML = `[${item.id}] ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    // UI Update: Include Source and Timestamp
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type} // SOURCE: ${item.source}`;
    document.getElementById('active-title').innerText = item.title;
    
    // We'll add the timestamp at the beginning of the description
    const formattedDate = `<span style="color: var(--orange); font-weight: 700;">[TIMESTAMP: ${item.timestamp}]</span><br><br>`;
    document.getElementById('active-description').innerHTML = formattedDate + item.description;
    
    const zone = document.getElementById('player-zone');
    zone.innerHTML = `
        <button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px;">
            ACCESS RAW DATA SOURCE
        </button>
    `;
}
