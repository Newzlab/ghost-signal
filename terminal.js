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
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type}`;
    document.getElementById('active-title').innerText = item.title;
    document.getElementById('active-description').innerText = item.description;
    
    const zone = document.getElementById('player-zone');
    zone.innerHTML = `
        <button class="action-btn" onclick="window.open('${item.source_url}', '_blank')" style="padding: 18px 50px; border-color: var(--cyan); color: var(--cyan);">
            ACCESS RAW DATA SOURCE
        </button>
    `;
}