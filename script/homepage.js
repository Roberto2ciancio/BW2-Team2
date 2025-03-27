document.addEventListener("DOMContentLoaded", function () {
  // Artisti da visualizzare sulla homepage
  const artisti = [
    {
      id: 412,
      name: "Artista 1",
      image: "https://api.deezer.com/artist/412/image",
    },
    {
      id: 92,
      name: "Artista 2",
      image: "https://api.deezer.com/artist/92/image",
    },
    {
      id: 860,
      name: "Artista 3",
      image: "https://api.deezer.com/artist/860/image",
    },
    {
      id: 60,
      name: "Artista 4",
      image: "https://api.deezer.com/artist/60/image",
    },
    {
      id: 170,
      name: "Artista 5",
      image: "https://api.deezer.com/artist/170/image",
    },
    {
      id: 2535,
      name: "Artista 6",
      image: "https://api.deezer.com/artist/2535/image",
    },
  ]

  // Seleziona il contenitore delle card
  const artistCardsContainer = document.getElementById("artist-cards-container")

  // Verifica che l'elemento esista
  if (artistCardsContainer) {
    // Crea e aggiungi una card per ogni artista
    artisti.forEach((artista, i) => {
      const col = document.createElement("div")
      col.classList.add("col-4")

      const card = document.createElement("div")
      card.classList.add("p-2", "g-col-4", "d-flex", "flex-row", "my-1")
      card.setAttribute("id", "card-home")
      card.setAttribute("data-artist-id", artista.id)

      card.innerHTML = `
        <img class="col-2" src="${artista.image}" alt="${artista.name}">
        <p class="col-10 fs-4 text-light ps-1">${artista.name}</p>
      `

      col.appendChild(card)
      artistCardsContainer.appendChild(col)

      const script = document.createElement("script")
      script.src = `https://api.deezer.com/artist/${artista.id}?output=jsonp&callback=updateArtist${i}`
      document.body.appendChild(script)

      window[`updateArtist${i}`] = function (data) {
        artisti[i].name = data.name
        card.querySelector("p").innerText = data.name
        card.querySelector("img").alt = data.name
      }

      // Aggiungi l'evento di click per ogni card
      card.addEventListener("click", () => {
        window.location.href = `/artist.html?id=${artista.id}`
      })
    })
  } else {
    console.error("Il contenitore per le card non è stato trovato.")
  }
})

document.addEventListener("DOMContentLoaded", function () {
  // Seleziona il contenitore della nuova sezione
  const moreArtistsContainer = document.querySelector("#more-artist-cards")

  // Nuovi artisti da aggiungere
  const moreArtists = [
    {
      id: 13,
      name: "Daft Punk",
      image: "https://api.deezer.com/artist/13/image",
    },
    {
      id: 27,
      name: "Bruno Mars",
      image: "https://api.deezer.com/artist/27/image",
    },
    {
      id: 75798,
      name: "Billie Eilish",
      image: "https://api.deezer.com/artist/75798/image",
    },
    {
      id: 144227,
      name: "Ed Sheeran",
      image: "https://api.deezer.com/artist/144227/image",
    },
    {
      id: 246791,
      name: "Imagine Dragons",
      image: "https://api.deezer.com/artist/246791/image",
    },
  ]

  // Verifica se il contenitore esiste
  if (moreArtistsContainer) {
    // Crea una riga per le card
    const row = document.createElement("div")
    row.classList.add("row", "d-flex", "justify-content-between")

    moreArtists.forEach((artist) => {
      const card = document.createElement("div")
      card.classList.add("col-2", "p-0", "mb-3") // Aggiungi mb-3 per dare un po' di spazio verticale

      card.innerHTML = `
        <div id="card-home-${artist.id}" class="p-1 rounded-2">
          <img class="w-100 rounded-1" src="${artist.image}" alt="${artist.name}">
          <h6 class="mt-2 text-light fw-semibold text-start">${artist.name}</h6>
          <p class="text-light text-start">Artista Consigliato</p>
        </div>
      `

      // Click per andare alla pagina dell'artista
      card.addEventListener("click", () => {
        window.location.href = `Albumpage.html?artist_id=${artist.id}`
      })

      // Aggiungi la card alla riga
      row.appendChild(card)
    })

    // Aggiungi la riga di card al contenitore
    moreArtistsContainer.appendChild(row)
  } else {
    console.error(
      "Il contenitore per la sezione 'Altro di ciò che ti piace' non è stato trovato."
    )
  }
})

// JS Sidebars //
const leftSidebar = document.getElementById("leftSidebar")
const toggleLeft = document.getElementById("toggleLeft")

toggleLeft.addEventListener("click", () => {
  leftSidebar.classList.toggle("left-collapsed")
})

const toggleRightText = document.getElementById("toggleRightText")
const rightSidebar = document.getElementById("rightSidebar")
const closeRight = document.getElementById("closeRight")

closeRight.addEventListener("click", () => {
  rightSidebar.classList.add("hidden")
  toggleRightText.classList.remove("d-none")
})

// Quando clicchi su "Attività amici" -> sidebar riappare, scritta scompare
toggleRightText.addEventListener("click", () => {
  rightSidebar.classList.remove("hidden")
  toggleRightText.classList.add("d-none")
})
