document.addEventListener("DOMContentLoaded", function () {
  // Artisti da visualizzare sulla homepage
  const artisti = [
    {
      id: 412,
      name: "",
      image: "https://api.deezer.com/artist/412/image",
    },
    {
      id: 92,
      name: "",
      image: "https://api.deezer.com/artist/92/image",
    },
    {
      id: 860,
      name: "",
      image: "https://api.deezer.com/artist/860/image",
    },
    {
      id: 60,
      name: "",
      image: "https://api.deezer.com/artist/60/image",
    },
    {
      id: 170,
      name: "",
      image: "https://api.deezer.com/artist/170/image",
    },
    {
      id: 2535,
      name: "",
      image: "https://api.deezer.com/artist/2535/image",
    },
  ]

  // Seleziona il contenitore delle card
  const artistCardsContainer = document.getElementById("artist-cards-container")

  // Verifica che l'elemento esista
  if (artistCardsContainer) {
    // Crea e aggiungi una card per ogni artista
    artisti.forEach((artista) => {
      const card = document.createElement("div")
      card.classList.add("col-2", "p-3", "rounded-2")
      card.setAttribute("data-artist-id", artista.id)

      card.innerHTML = `
            <img src="${artista.image}" alt="${artista.name}" class="w-100 rounded-1">
            <h6 class="mt-1 text-light fw-semibold">${artista.name}</h6>
            <p class="text-light">Artista Popolare</p>
          `

      // Aggiungi l'evento di click per ogni card
      card.addEventListener("click", () => {
        window.location.href = `/artist.html?id=${artista.id}`
      })

      // Aggiungi la card al contenitore
      artistCardsContainer.appendChild(card)
    })
  } else {
    console.error("Il contenitore per le card non è stato trovato.")
  }
})
