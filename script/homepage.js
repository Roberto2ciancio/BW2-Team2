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
  ];

  // Seleziona il contenitore delle card
  const artistCardsContainer = document.getElementById(
    "artist-cards-container"
  );

  if (artistCardsContainer) {
    // Crea e aggiungi una card per ogni artista
    artisti.forEach((artista, i) => {
      const col = document.createElement("div");
      col.classList.add("col-6", "col-md-4");
      const card = document.createElement("div");
      card.classList.add(
        "rounded-start-4",
        "g-col-4",
        "d-flex",
        "flex-row",
        "my-1",
        "mb-2",
        "mt-3"
      );
      card.setAttribute("id", "card-home");
      card.setAttribute("data-artist-id", artista.id);

      card.innerHTML = `
  <img class="w-auto" src="${artista.image}" alt="${artista.name}">
  <div class="ms-2 ps-1">
    <p class="fs-4 text-light d-flex align-items-center mt-3">${artista.name}</p>
    <a href="#" class="song-title text-white text-decoration-none" data-artist-id="${artista.id}">▶ Ascolta brano</a>
  </div>
`;
      col.appendChild(card);
      artistCardsContainer.appendChild(col);

      const script = document.createElement("script");
      script.src = `https://api.deezer.com/artist/${artista.id}?output=jsonp&callback=updateArtist${i}`;
      document.body.appendChild(script);
      window[`updateArtist${i}`] = function (data) {
        artisti[i].name = data.name;
        card.querySelector("p").innerText = data.name;
        card.querySelector("img").alt = data.name;
      };

      // Aggiungi l'evento di click per ogni card
      card.addEventListener("click", () => {
        window.location.href = `/artist.html?id=${artista.id}`;
      });
      const songLink = card.querySelector(".song-title");
      songLink.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          const response = await fetch(
            `https://corsproxy.io/?https://api.deezer.com/artist/${artista.id}/top?limit=1`
          );
          const data = await response.json();
          const track = data.data[0];

          if (track && track.preview) {
            document.getElementById("player-title").textContent = track.title;
            document.getElementById("player-artist").textContent =
              track.artist.name;
            document.getElementById("player-cover").src =
              track.album.cover_medium;
            const audio = document.getElementById("audio-player");
            audio.src = track.preview;
            audio.play();

            const playBtn = document.getElementById("play-pause-btn");
            playBtn.classList.remove("bi-play-circle-fill");
            playBtn.classList.add("bi-pause-circle-fill");
          }
        } catch (err) {
          console.error("Errore nel caricamento del brano dell'artista:", err);
        }
      });
    });
  } else {
    console.error("Il contenitore per le card non è stato trovato.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Seleziona il contenitore della nuova sezione
  const moreArtistsContainer = document.querySelector("#more-artist-cards");

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
  ];

  // Verifica se il contenitore esiste
  if (moreArtistsContainer) {
    // Crea una riga per le card
    const row = document.createElement("div");
    row.classList.add("row", "d-flex", "justify-content-between", );

    moreArtists.forEach((artist) => {
<<<<<<< Updated upstream
      const card = document.createElement("div");
      card.classList.add("col-12", "col-md-6", "col-lg-2", "p-0", "mb-3", "cards-container",); // Aggiungi mb-3 per dare un po' di spazio verticale
=======
      const card = document.createElement("div")
      card.classList.add("col-12", "col-md-6", "col-lg-2", "p-0", "mb-3", "cards-container", ) // Aggiungi mb-3 per dare un po' di spazio verticale
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

      card.innerHTML = `
        <div id="card-home-${artist.id}" class="p-1 rounded-2 mb-3">
        
        <div class="d-flex flex-column align-items-start h-100">
          <img class="img-fluid " src="${artist.image}" alt="${artist.name}">
      
          <h6 class="mt-3 ms-2 text-light fw-bold fw-semibold   ">${artist.name}</h6>
          <p class=" ms-2 text-light fw-light ">Artista Consigliato</p>
         </div>
           <div class="d-md-none d-flex justify-content-between "> 
           <div>
          <span class="ms-2 text-success fs-1 "><i class="bi bi-heart-fill"></i></span>
          <span class="justify-content-start"><i class="bi bi-three-dots-vertical fs-1"></i></span>
          </div>
          <div class="d-flex ">
          <p class="fw-lighter mx-4 mt-2">16 brani</p>
          <span><i class="bi bi-play-circle-fill text-dark fs-1 mx-3"></i></i></span>
          </div>
          
          
        </div>
         
        </div>
      `  if (moreArtistsContainer) {
        // Crea una riga per le card
        const row = document.createElement("div")
        row.classList.add("row", "d-flex", "justify-content-between")
    
        moreArtists.forEach((artist) => {
          const card = document.createElement("div")
          card.classList.add("col-12", "col-md-6", "col-lg-2", "p-0", "mb-3", "cards-container", ) // Aggiungi mb-3 per dare un po' di spazio verticale
    
          card.innerHTML = `
            <div id="card-home-${artist.id}" class="p-1 rounded-2 mb-3">
            
            <div class="d-flex flex-column align-items-start h-100">
              <img class="img-fluid " src="${artist.image}" alt="${artist.name}">
          
              <h6 class="mt-3 ms-2 text-light fw-bold fw-semibold   ">${artist.name}</h6>
              <p class=" ms-2 text-light fw-light ">Artista Consigliato</p>
             </div>
               <div class="d-md-none d-flex justify-content-between "> 
               <div>
              <span class="ms-2 text-success fs-1 "><i class="bi bi-heart-fill"></i></span>
              <span class="justify-content-start"><i class="bi bi-three-dots-vertical fs-1"></i></span>
              </div>
              <div class="d-flex ">
              <p class="fw-lighter mx-4 mt-2">16 brani</p>
              <span><i class="bi bi-play-circle-fill text-dark fs-1 mx-3"></i></i></span>
              </div>
              
              
            </div>
             
            </div>
          `
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

      // Click per andare alla pagina dell'artista
      card.addEventListener("click", () => {
        window.location.href = `Albumpage.html?artist_id=${artist.id}`;
      });

      // Aggiungi la card alla riga
      row.appendChild(card);
    });

    // Aggiungi la riga di card al contenitore
    moreArtistsContainer.appendChild(row);
  } else {
    console.error(
      "Il contenitore per la sezione 'Altro di ciò che ti piace' non è stato trovato."
    );
  }
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
