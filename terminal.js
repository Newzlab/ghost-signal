/* --- GHOST SIGNAL TERMINAL v2.7 --- */

window.onload = () => {
    // 1. Start Clock
    setInterval(updateClock, 1000); 
    
    // 2. BOOT: Load Database immediately
    if (typeof db !== 'undefined') {
        filterSignals('D_INT_DARK'); 
    }
};

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('digital-clock');
    if (clock) clock.innerText = now.toLocaleTimeString('en-GB', { hour12: false });
}

function filterSignals(category) {
    // UI Update
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    const activeModule = Array.from(document.querySelectorAll('.intel-module'))
        .find(m => m.getAttribute('onclick').includes(category));
    if (activeModule) activeModule.classList.add('active-module');

    // Data Update
    const filtered = db.filter(item => item.type === category || item.cat_code === category);
    renderDirectory(filtered, category);
}

function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    const title = document.getElementById('vault-title');
    if (title) title.innerText = `DIRECTORY // ${label}`;
    if (!container) return;

    container.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        div.innerHTML = `<span style="color: var(--orange); font-weight:700;">[${item.cat_code || 'DARK'}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type}`;
    document.getElementById('active-title').innerText = item.title;
    document.getElementById('active-description').innerText = item.description;
    document.querySelector('.center-stage').scrollTop = 0;
}

function openManifesto() { document.getElementById('manifesto-overlay').style.display = 'flex'; }
function closeManifesto() { document.getElementById('manifesto-overlay').style.display = 'none'; }
