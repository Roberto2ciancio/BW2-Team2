document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  const artistId = params.get("id")

  if (!artistId) {
    console.error("Nessun ID artista trovato nell'URL.")
    return
  }

  const artistApiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`

  fetch(artistApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati dell'artista.")
      }
      return response.json()
    })
    .then((data) => {
      console.log("Dati Artista:", data)

      // Popolamento dei dati dell'artista nella pagina
      const heroSection = document.querySelector(".hero")
      if (heroSection) {
        document.querySelector(".hero h1").textContent = data.name
        document.querySelector(
          ".hero p"
        ).textContent = `${data.nb_fan.toLocaleString()} ascoltatori mensili`
        heroSection.style.backgroundImage = `url(${data.picture_xl})`
      }

      // Caricamento delle canzoni popolari
      const topTracksApiUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=5`

      fetch(topTracksApiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore nel recupero delle canzoni.")
          }
          return response.json()
        })
        .then((songsData) => {
          console.log("Dati Canzoni:", songsData)
          const songsList = document.querySelector(".popolari-section")

          if (songsList) {
            songsList.innerHTML = "" // Pulisce la lista

            // Aggiungi i brani alla lista
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
                    ${Math.floor(song.duration / 60)}:${(song.duration % 60)
                .toString()
                .padStart(2, "0")}
                  </span>
                `
              songsList.appendChild(songItem)
            })
          } else {
            console.error("Elemento .popolari-section ul non trovato.")
          }
        })
        .catch((error) =>
          console.error("Errore nel recupero delle canzoni:", error)
        )
    })
    .catch((error) =>
      console.error("Errore nel recupero dei dati dell'artista:", error)
    )
})
