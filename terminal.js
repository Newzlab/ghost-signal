const init = setInterval(() => {
    if (typeof db !== 'undefined') {
        filterSignals('D_INT_DARK');
        clearInterval(init);
    }
}, 500);

function filterSignals(cat) {
    document.querySelectorAll('.intel-module').forEach(m => m.style.borderLeft = "none");
    event?.currentTarget ? event.currentTarget.style.borderLeft = "3px solid #FF5500" : null;

    const filtered = db.filter(item => item.type === cat || item.cat_code === cat);
    const container = document.getElementById('vault-content');
    container.innerHTML = '';

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        div.innerHTML = `<span style="color:#FF5500;">[${item.cat_code}]</span> ${item.title}`;
        div.onclick = () => {
            document.getElementById('label-type').innerText = `UPLINK // ${item.type}`;
            document.getElementById('active-title').innerText = item.title;
            document.getElementById('active-description').innerText = item.description + "...";
            document.getElementById('player-zone').innerHTML = `<button class="btn" onclick="window.open('${item.source_url}')">ACCESS SOURCE</button>`;
        };
        container.appendChild(div);
    });
}
