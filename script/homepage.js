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