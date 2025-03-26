const audio = document.getElementById("audio-player");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const progressBar = document.getElementById("progress-bar");

    function updatePlayer(title, artist, cover, audioSrc) {
        document.getElementById("player-title").textContent = title;
        document.getElementById("player-artist").textContent = artist;
        document.getElementById("player-cover").src = cover;
        audio.src = audioSrc;
      
        // Resetta il bottone a "play"
        playPauseBtn.classList.remove("bi-pause-circle-fill");
        playPauseBtn.classList.add("bi-play-circle-fill");

        // Reset barra di progresso
  progressBar.value = 0;
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

    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;
    });

    function seekAudio(value) {
      const seekTime = (value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }