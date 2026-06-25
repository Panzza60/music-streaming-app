const API_BASE = 'http://localhost:5000/api';
let currentSong = null;
let isPlaying = false;
let allPlaylists = [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    if (sectionId === 'playlists') loadPlaylists();
}

function quickSearch() {
    const query = document.getElementById('quickSearchInput').value;
    if (query.trim()) {
        document.getElementById('searchInput').value = query;
        showSection('search');
        searchMusic();
    }
}

async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    if (!query.trim()) return;
    try {
        const response = await fetch(`${API_BASE}/music/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.success) displayResults(data.results);
    } catch (error) {
        alert('Error en la búsqueda');
    }
}

async function loadTrending() {
    try {
        const response = await fetch(`${API_BASE}/music/trending`);
        const data = await response.json();
        if (data.success) displayResults(data.data, 'trendingResults');
    } catch (error) {
        alert('Error cargando trending');
    }
}

function displayResults(songs, containerId = 'searchResults') {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    songs.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <img src="${song.thumbnail || 'https://via.placeholder.com/180'}" alt="">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;
        card.onclick = () => showSongModal(song);
        container.appendChild(card);
    });
}

function showSongModal(song) {
    currentSong = song;
    document.getElementById('modalThumbnail').src = song.thumbnail || '';
    document.getElementById('modalTitle').textContent = song.title;
    document.getElementById('modalArtist').textContent = song.artist;
    document.getElementById('songModal').classList.add('active');
}

function closeSongModal() {
    document.getElementById('songModal').classList.remove('active');
}

function playSongFromModal() {
    playSong(currentSong);
    closeSongModal();
}

function playSong(song) {
    currentSong = song;
    document.getElementById('playerThumbnail').src = song.thumbnail || '';
    document.getElementById('playerTitle').textContent = song.title;
    document.getElementById('playerArtist').textContent = song.artist;
    document.getElementById('playPauseBtn').textContent = '⏸️';
    isPlaying = true;
}

function togglePlayPause() {
    if (!currentSong) return;
    isPlaying = !isPlaying;
    document.getElementById('playPauseBtn').textContent = isPlaying ? '⏸️' : '▶️';
}

function previousSong() { alert('Anterior'); }
function nextSong() { alert('Siguiente'); }

async function createPlaylist() {
    const name = document.getElementById('playlistName').value;
    if (!name.trim()) return;
    try {
        const response = await fetch(`${API_BASE}/playlists/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        if (data.success) {
            document.getElementById('playlistName').value = '';
            loadPlaylists();
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadPlaylists() {
    try {
        const response = await fetch(`${API_BASE}/playlists`);
        const data = await response.json();
        if (data.success) {
            allPlaylists = data.data;
            document.getElementById('playlistsList').innerHTML = data.data.map(p => 
                `<div class="song-card"><h3>${p.name}</h3><p>${p.songs.length} canciones</p></div>`
            ).join('');
        }
    } catch (error) {
        console.error(error);
    }
}

window.onclick = (e) => {
    if (e.target.id === 'songModal') closeSongModal();
};

loadPlaylists();