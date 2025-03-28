document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const artistId = params.get("artist_id");

  console.log("Artist ID:", artistId);

  if (!artistId) {
    console.error("Nessun ID artista trovato nell'URL.");
    return;
  }

  // Fetch album dell'artista tramite l'API
  const albumApiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`;

  fetch(albumApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati dell'album.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dati Album dell'artista:", data);

      if (!data.data || data.data.length === 0) {
        console.error("Nessun album trovato per questo artista.");
        return;
      }

      // Seleziona il primo album
      const album = data.data[0];

      // Popola la pagina con i dati dell'album
      const albumTitle = document.querySelector("#album-title");
      const albumShortTitle = document.querySelector("#album");
      const albumCover = document.querySelector(".album-cover");
      const albumYear = document.querySelector("#anno-uscita");

      if (albumTitle) albumTitle.textContent = album.title;
      if (albumShortTitle) albumShortTitle.textContent = album.title_short;
      if (albumCover) albumCover.src = album.cover_big;
      if (albumYear) albumYear.textContent = album.release_date;

      // Fetch tracce dell'album
      const tracksApiUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${album.id}`;

      fetch(tracksApiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore nel recupero delle tracce dell'album.");
          }
          return response.json();
        })
        .then((tracksData) => {
          console.log("Tracce dell'album:", tracksData);

          if (!tracksData.tracks || tracksData.tracks.data.length === 0) {
            console.error("Nessuna traccia trovata per questo album.");
            return;
          }

          const songsList = document.querySelector("#list-music ol");

          if (songsList) {
            songsList.innerHTML = ""; // Pulisce la lista

            tracksData.tracks.data.forEach((track, index) => {
              const songItem = document.createElement("li");
              songItem.classList.add(
                "text-light",
                "fs-5",
                "my-4",
                "d-flex",
                "border-bottom",
                "justify-content-between",
                "align-items-center"
              );

              songItem.innerHTML = `
                <span class="fs-4 mb-4 fw-semibold col-6 text-start">${
                  index + 1
                }. ${track.title}</span>
                <span id="rank" class="track-number text-light fw-lighter col text-start ">${
                  track.rank
                }</span>
                <span id="duration" class="text-light col fw-lighter text-end">${Math.floor(
                  track.duration / 60
                )}:${(track.duration % 60).toString().padStart(2, "0")}</span>
              `;
              songsList.appendChild(songItem);
            });
          } else {
            console.error("Elemento #list-music ol non trovato.");
          }
        })
        .catch((error) =>
          console.error("Errore nel recupero delle tracce:", error)
        );
    })
    .catch((error) =>
      console.error("Errore nel recupero dei dati dell'album:", error)
    );
});

// JS Sidebars //
const leftSidebar = document.getElementById("leftSidebar");
const toggleLeft = document.getElementById("toggleLeft");

toggleLeft.addEventListener("click", () => {
  leftSidebar.classList.toggle("left-collapsed");
});

const toggleRightText = document.getElementById("toggleRightText");
const rightSidebar = document.getElementById("rightSidebar");
const closeRight = document.getElementById("closeRight");

closeRight.addEventListener("click", () => {
  rightSidebar.classList.add("hidden");
  toggleRightText.classList.remove("d-none");
});

// Quando clicchi su "Attività amici" -> sidebar riappare, scritta scompare
toggleRightText.addEventListener("click", () => {
  rightSidebar.classList.remove("hidden");
  toggleRightText.classList.add("d-none");
});
