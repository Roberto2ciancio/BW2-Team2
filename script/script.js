document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  const artistId = params.get("id")

  if (!artistId) {
    console.error("Nessun ID artista trovato nell'URL.")
    return
  }

  const artistApiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`

  fetch(artistApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Dati Artista:", data)
      document.querySelector(".hero h1").textContent = data.name
      document.querySelector(
        ".hero p"
      ).textContent = `${data.nb_fan.toLocaleString()} ascoltatori mensili`
      document.querySelector(
        ".hero"
      ).style.backgroundImage = `url(${data.picture_xl})`

      const topTracksApiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=5`

      fetch(topTracksApiUrl)
        .then((response) => response.json())
        .then((songsData) => {
          console.log("Dati Canzoni:", songsData)
          const songsList = document.querySelector(".popolari-section ul")
          if (songsList) {
            songsList.innerHTML = "" // Svuota la lista esistente

            songsData.data.forEach((song, index) => {
              const songItem = document.createElement("li")
              songItem.classList.add(
                "list-group-item",
                "d-flex",
                "align-items-center",
                "border-0",
                "bg-dark"
              )

              songItem.innerHTML = `
                    <img src="${song.album.cover_small}" alt="${
                song.title
              }" class="song-img" />
                    <span class="ms-3 spanTitolo text-light">${index + 1}. ${
                song.title
              }</span>
                    <span class="track-number text-light">${song.rank.toLocaleString()}</span>
                    <span class="ms-auto spanTemp text-light" id="song-duration-${index}">
                      ${
                        window.innerWidth < 768
                          ? '<i class="fa-solid fa-ellipsis-v"></i>'
                          : `${Math.floor(song.duration / 60)}:${(
                              song.duration % 60
                            )
                              .toString()
                              .padStart(2, "0")}`
                      }
                    </span>
                  `
              songsList.appendChild(songItem)
            })
          } else {
            console.error("Elemento .popolari-section ul non trovato.")
          }

          // Funzione per aggiornare la durata delle canzoni
          function updateSongDurations() {
            document.querySelectorAll(".spanTemp").forEach((span, index) => {
              const song = songsData.data[index]
              if (window.innerWidth < 768) {
                span.innerHTML = '<i class="fa-solid fa-ellipsis-v"></i>'
              } else {
                span.innerHTML = `${Math.floor(song.duration / 60)}:${(
                  song.duration % 60
                )
                  .toString()
                  .padStart(2, "0")}`
              }
            })
          }

          // Aggiornamento iniziale della durata
          updateSongDurations()

          // Event listener per aggiornare la durata durante il resize
          window.addEventListener("resize", function () {
            setTimeout(updateSongDurations, 100)
          })
        })
        .catch((error) =>
          console.error("Errore nel recupero delle canzoni:", error)
        )
    })
    .catch((error) =>
      console.error("Errore nel recupero dei dati dell'artista:", error)
    )
})
