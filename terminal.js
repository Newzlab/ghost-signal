/* --- GHOST SIGNAL TERMINAL LOGIC v2.6 --- */

window.onload = () => {
    if (typeof db !== 'undefined') filterSignals('D_INT_DARK');
};

function filterSignals(category) {
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    const activeModule = Array.from(document.querySelectorAll('.intel-module'))
        .find(m => m.getAttribute('onclick').includes(category));
    if (activeModule) activeModule.classList.add('active-module');

    const filtered = db.filter(item => item.type === category || item.cat_code === category);
    renderDirectory(filtered, category);
}

function renderDirectory(data, label) {
    const container = document.getElementById('vault-content');
    document.getElementById('vault-title').innerText = `DIRECTORY // ${label}`;
    container.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        div.style = "padding: 10px; border-bottom: 1px solid rgba(255,85,0,0.1); cursor: pointer; font-size: 0.8rem;";
        div.innerHTML = `<span style="color: var(--orange);">[${item.cat_code || 'DARK'}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    document.getElementById('label-type').innerText = `PRIORITY_SIGNAL // ${item.type}`;
    document.getElementById('active-title').innerText = item.title;
    document.getElementById('active-description').innerHTML = `<p style="line-height:1.8;">${item.description}</p>`;
    document.getElementById('player-zone').innerHTML = `<button class="action-btn" onclick="window.open('${item.source_url}', '_blank')">ACCESS RAW DATA</button>`;
    document.querySelector('.center-stage').scrollTop = 0;
}

let audioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('play-trigger');
    if (!audioPlaying) {
        audio.play(); btn.innerText = "TERMINATE_AUDIO"; btn.style.color = "#ff0000"; audioPlaying = true;
    } else {
        audio.pause(); btn.innerText = "INITIALIZE_AUDIO"; btn.style.color = "var(--orange)"; audioPlaying = false;
    }
}

function openManifesto() { document.getElementById('manifesto-overlay').style.display = 'flex'; }
function closeManifesto() { document.getElementById('manifesto-overlay').style.display = 'none'; }
