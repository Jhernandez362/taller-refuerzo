const colorButton = document.getElementById("colorButton");
const counterValue = document.querySelector("#counterValue");
const incrementButton = document.querySelector("#incrementButton");
const decrementButton = document.querySelector("#decrementButton");
const resetButton = document.querySelector("#resetButton");
let counter = 0;

function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
};


/// 1. Generate random background.
colorButton.addEventListener("click",()=>{
    document.body.style.backgroundColor = generateRandomColor();
});

/// 2. Update counter with decrement,increment and reset buttons get with query selector.
incrementButton.addEventListener('click',()=>{
    counter++;
    updateCounter();
});

decrementButton.addEventListener('click',()=>{
    counter--;
    updateCounter();
});

resetButton.addEventListener('click',()=>{
    counter=0;
    updateCounter();
});

function updateCounter() {
    counterValue.textContent = counter;
};