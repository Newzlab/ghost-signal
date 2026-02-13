/* --- GHOST SIGNAL TERMINAL LOGIC --- */

// Auto-boot when data loads
const boot = setInterval(() => {
    if (typeof db !== 'undefined') {
        filterSignals('D_INT_DARK');
        clearInterval(boot);
    }
}, 500);

function filterSignals(category) {
    // UI Update
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    const modules = document.querySelectorAll('.intel-module');
    modules.forEach(m => {
        if (m.getAttribute('onclick').includes(category)) m.classList.add('active-module');
    });

    // Data Filtering
    const filtered = db.filter(item => item.type === category || item.cat_code === category);
    renderDirectory(filtered, category);
}

function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    container.innerHTML = '';
    
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        div.innerHTML = `<span style="color: #FF5500; font-weight:700;">[${item.cat_code || 'DECK'}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type}`;
    document.getElementById('active-title').innerText = item.title;
    document.getElementById('active-description').innerHTML = item.description + "...";
    document.getElementById('player-zone').innerHTML = `<div class="action-btn" onclick="window.open('${item.source_url}', '_blank')">ACCESS_RAW_DATA_SOURCE</div>`;
    
    // Scroll center stage to top
    document.getElementById('article-display').scrollTop = 0;
}
