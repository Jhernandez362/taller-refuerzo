const colorButton = document.getElementById("colorButton");

const counterValue = document.querySelector("#counterValue");
const incrementButton = document.querySelector("#incrementButton");
const decrementButton = document.querySelector("#decrementButton");
const resetButton = document.querySelector("#resetButton");
let counter = 0;

const passwordInput = document.getElementById("passwordInput");
const passwordMessage = document.getElementById("passwordMessage");

const searchInput = document.getElementById("searchInput");
const animeItems = document.querySelectorAll(".anime-item");

const galleryContainer = document.getElementById("galleryContainer");
const mainImage = document.getElementById("mainImage");

const characterContainer = document.getElementById("characterContainer");

const darkModeButton = document.getElementById("darkModeButton");

const favoritesContainer = document.getElementById("favoritesContainer");

const secondsInput = document.getElementById("secondsInput");
const startTimerButton = document.getElementById("startTimerButton");
const timerDisplay = document.getElementById("timerDisplay");
const timerContainer = document.getElementById("timerContainer");

/// 1. Generate random background.
colorButton.addEventListener("click", () => {
  document.body.style.backgroundColor = generateRandomColor();
});

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

/// 2. Update counter with decrement,increment and reset buttons get with query selector.
incrementButton.addEventListener("click", () => {
  counter++;
  updateCounter();
});

decrementButton.addEventListener("click", () => {
  counter--;
  updateCounter();
});

resetButton.addEventListener("click", () => {
  counter = 0;
  updateCounter();
});

function updateCounter() {
  counterValue.textContent = counter;
}

/// 3. Read in real time the length of the input password.
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  if (password.length >= 8) {
    passwordMessage.classList.remove("invalid");
    passwordMessage.classList.add("valid");
    console.log("mas 8");
  } else {
    passwordMessage.classList.remove("valid");
    passwordMessage.classList.add("invalid");
    console.log("-8");
  }
});

/// 4. Get list item for leters in input.
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.trim().toLowerCase();
  animeItems.forEach((anime) => {
    const animeTitle = anime.textContent.toLowerCase();

    if (animeTitle.includes(searchText)) {
      anime.style.display = "list-item";
    } else {
      anime.style.display = "none";
    }
  });
});

/// 5. Change the main image with click on the thumbnail.
galleryContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    mainImage.src = event.target.src;
  }
});

/// 6. Generate cards with data from a local array.
const characters = [
  {
    name: "Naruto Uzumaki",
    role: "Hokage",
    biography: "Un ninja que sueña con convertirse en Hokage.",
  },
  {
    name: "Monkey D. Luffy",
    role: "Capitan Pirata",
    biography: "El futuro Rey de los Piratas.",
  },
  {
    name: "Ichigo Kurosaki",
    role: "Shinigami a tiempo parcial :v",
    biography: "Protector de la ciudad de Karakura.",
  },
  {
    name: "Sung Jin-Woo",
    role: "Monarca de las sombras",
    biography: "El cazador mas fuerte en solitario.",
  },
];

characters.forEach((character) => {
  const card = document.createElement("article");
  card.classList.add("character-card");
  card.innerHTML = `
        <h3 class="character-name">
            ${character.name}
        </h3>
        <p class="character-role">
            ${character.role}
        </p>
        <p>
            ${character.biography}
        </p>
    `;
  characterContainer.appendChild(card);
});

/// 7. Toggle dark mode button.
const savedMode = localStorage.getItem("darkMode");

if (savedMode === "true") {
  document.body.classList.add("dark-mode");
}

darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

/// 8. Saved data in local storage like favorites.
const animeList = [
  {
    id: 1,
    title: "Naruto",
  },
  {
    id: 2,
    title: "One Piece",
  },
  {
    id: 3,
    title: "Bleach",
  },
  {
    id: 4,
    title: "Solo Leveling",
  },
  {
    id: 5,
    title: "Jujutsu Kaisen",
  },
];

const favorites = JSON.parse(localStorage.getItem("favoriteAnime")) || [];

function saveFavorites() {
  localStorage.setItem("favoriteAnime", JSON.stringify(favorites));
}

function renderAnimeCards() {
  favoritesContainer.innerHTML = "";
  animeList.forEach((anime) => {
    const card = document.createElement("article");
    card.classList.add("favorite-card");
    const isFavorite = favorites.includes(anime.id);

    if (isFavorite) {
      card.classList.add("favorite-active");
    }

    card.innerHTML = `
            <h3>${anime.title}</h3>

            <button
                class="button favorite-button"
                data-id="${anime.id}"
            >
                ${isFavorite ? "Remover de favoritos" : "Añadir a favoritos"}
            </button>
        `;
    favoritesContainer.appendChild(card);
  });
}

favoritesContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("favorite-button")) {
    return;
  }

  const animeId = Number(event.target.dataset.id);
  const favoriteIndex = favorites.indexOf(animeId);
  if (favoriteIndex === -1) {
    favorites.push(animeId);
  } else {
    favorites.splice(favoriteIndex, 1);
  }
  saveFavorites();
  renderAnimeCards();
});

renderAnimeCards();

/// 9. Countdown object
let intervalId;

startTimerButton.addEventListener("click", () => {
  clearInterval(intervalId);
  let seconds = Number(secondsInput.value);
  if (seconds <= 0) {
    return;
  }

  timerContainer.classList.remove("timer-finished");
  timerDisplay.textContent = seconds;
  
  intervalId = setInterval(() => {
    seconds--;
    timerDisplay.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(intervalId);
      timerDisplay.textContent = "El Episodio está empezando!!!";
      timerContainer.classList.add("timer-finished");
    }
  }, 1000);
});
