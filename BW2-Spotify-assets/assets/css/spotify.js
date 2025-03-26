const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressBar = document.getElementById("progress-bar");

const volumeSlider = document.getElementById("volume-slider");
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

const playlist = [
  {
    title: "Fat Funny Friend",
    artist: "Maddie Zahm",
    cover: "https://i.scdn.co/image/ab67616d00001e024e2288e5c1e54885955bb278",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    cover: "https://i.scdn.co/image/ab67616d00001e02d36c2dcb8ff8ef9d81e2bff6",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Shivers",
    artist: "Ed Sheeran",
    cover: "https://i.scdn.co/image/ab67616d00001e021dfde7f92fd4848325723c3d",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

let currentIndex = 0;

function loadTrack(index) {
  const track = playlist[index];
  document.getElementById("player-title").textContent = track.title;
  document.getElementById("player-artist").textContent = track.artist;
  document.getElementById("player-cover").src = track.cover;
  audio.src = track.src;

  // Reset player UI
  playPauseBtn.classList.remove("bi-pause-circle-fill");
  playPauseBtn.classList.add("bi-play-circle-fill");
  progressBar.value = 0;
  document.getElementById("current-time").textContent = "0:00";
  document.getElementById("duration").textContent = "0:00";
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

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    document.getElementById("current-time").textContent = formatTime(
      audio.currentTime
    );
    document.getElementById("duration").textContent = formatTime(
      audio.duration
    );
  }
});

function seekAudio(value) {
  const seekTime = (value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

// Track click handler (da lista)
function updatePlayer(title, artist, cover, src) {
  const index = playlist.findIndex(
    (t) => t.title === title && t.artist === artist
  );
  if (index !== -1) currentIndex = index;
  loadTrack(currentIndex);
}

// Previous / Next
document.getElementById("prev-btn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});

// Autoplay next on track end (opzionale)
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playPauseBtn.classList.remove("bi-play-circle-fill");
  playPauseBtn.classList.add("bi-pause-circle-fill");
});

// Load first track by default
loadTrack(currentIndex);
