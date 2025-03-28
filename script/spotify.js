const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
window.window.playlist = [];
window.window.currentIndex = 0;

async function fetchDeezerTracks(query = "queen") {
  const proxyUrl = `https://corsproxy.io/?https://api.deezer.com/search?q=${query}`;
  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();
    if (!data || !data.data) {
      console.error("Risposta inattesa dalla API Deezer:", data);
      return;
    }
    window.playlist = data.data.map(track => ({
      title: track.title,
      artist: track.artist.name,
      cover: track.album.cover_medium,
      src: track.preview
    }));
    renderTrackList();
    loadTrack(0);
  } catch (error) {
    console.error("Errore durante il fetch o il parsing della risposta:", error);
  }
}

function renderTrackList() {
  const container = document.getElementById("track-list");
  if (!container) return;
  container.innerHTML = "";
  window.playlist.forEach((track, i) => {
    const div = document.createElement("div");
    div.classList.add("track");
    div.textContent = `🎵 ${track.title} – ${track.artist}`;
    div.onclick = () => {
      loadTrack(i);
    };
    container.appendChild(div);
  });
}

function loadTrack(index) {
  if (window.playlist.length === 0) return;
  window.currentIndex = index;
  const track = window.playlist[index];
  document.getElementById("player-title").textContent = track.title;
  document.getElementById("player-artist").textContent = track.artist;
  document.getElementById("player-cover").src = track.cover;
  audio.src = track.src;
  playPauseBtn.classList.remove("bi-pause-circle-fill");
  playPauseBtn.classList.add("bi-play-circle-fill");
  progressBar.value = 0;
  document.getElementById("current-time").textContent = "0:00";
  document.getElementById("duration").textContent = "0:00";
  togglePlay();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.classList.remove("bi-play-circle-fill");
    playPauseBtn.classList.add("bi-pause-circle-fill");
  } else {
    audio.pause();
    playPauseBtn.classList.remove("bi-pause-circle-fill");
    playPauseBtn.classList.add("bi-play-circle-fill");
  }
}
playPauseBtn.addEventListener("click", () => {
  togglePlay();
});

audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    document.getElementById("current-time").textContent = formatTime(audio.currentTime);
    document.getElementById("duration").textContent = formatTime(audio.duration);
  }
});

function seekAudio(value) {
  const seekTime = (value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

function formatTime(seconds) {
  if (seconds < 0) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (window.playlist.length === 0) return;
  window.currentIndex = (window.currentIndex - 1 + window.playlist.length) % window.playlist.length;
  loadTrack(window.currentIndex);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (window.playlist.length === 0) return;
  window.currentIndex = (window.currentIndex + 1) % window.playlist.length;
  loadTrack(window.currentIndex);
});

// Sicuro: solo se gli elementi di ricerca esistono
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

if (searchInput && searchBtn) {
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchDeezerTracks(query);
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });
}
