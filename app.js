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
    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();
    animeItems.forEach(anime => {
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
        mainImage.src =
            event.target.src;
    }
});