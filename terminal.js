window.onload = () => { if (typeof db !== 'undefined') filterSignals('D_INT_DARK'); };

function filterSignals(category) {
    document.querySelectorAll('.intel-module').forEach(m => m.classList.remove('active-module'));
    const modules = document.querySelectorAll('.intel-module');
    modules.forEach(m => {
        if (m.getAttribute('onclick').includes(category)) m.classList.add('active-module');
    });

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
        div.innerHTML = `<span class="cat-tag">[${item.cat_code}]</span> ${item.title}`;
        div.onclick = () => decryptSignal(item);
        container.appendChild(div);
    });
}

function decryptSignal(item) {
    document.getElementById('label-type').innerText = `PRIORITY // ${item.type}`;
    document.getElementById('active-title').innerText = item.title;
    document.getElementById('active-description').innerHTML = item.description + "...";
    document.getElementById('player-zone').innerHTML = `<button class="action-btn" onclick="window.open('${item.source_url}', '_blank')">ACCESS RAW DATA</button>`;
}

let audioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('play-trigger');
    if (!audioPlaying) {
        audio.play(); btn.innerText = "TERMINATE_AUDIO"; audioPlaying = true;
    } else {
        audio.pause(); btn.innerText = "INITIALIZE_AUDIO"; audioPlaying = false;
    }
}
