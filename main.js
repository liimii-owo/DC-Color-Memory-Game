const redSlider = document.querySelector("#red");
const greenSlider = document.querySelector("#green");
const blueSlider = document.querySelector("#blue");

const redValue = document.querySelector("#redValue");
const greenValue = document.querySelector("#greenValue");
const blueValue = document.querySelector("#blueValue");

const colorBox = document.querySelector("#colorBox");
const controls = document.querySelector("#controls");
const submitBtn = document.querySelector("#submitBtn");

const statusText = document.querySelector("#statusText");
const timerText = document.querySelector("#timerText");
const scoreText = document.querySelector("#scoreText");

const MEMORY_TIME = 3;
const MAX_ERROR = Math.sqrt(255 ** 2 + 255 ** 2 + 255 ** 2);

let targetColor = generateRandomColor();
let timeLeft = MEMORY_TIME;

function generateRandomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

function toRgbString(color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function updateGuessColor() {
    const r = Number(redSlider.value);
    const g = Number(greenSlider.value);
    const b = Number(blueSlider.value);

    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;

    const color = `rgb(${r}, ${g}, ${b})`;

    colorBox.style.backgroundColor = color;

    redSlider.style.setProperty("--thumb-color", color);
    greenSlider.style.setProperty("--thumb-color", color);
    blueSlider.style.setProperty("--thumb-color", color);

    updateSliderBackgrounds(r, g, b);
}

function updateSliderBackgrounds(r, g, b) {
    redSlider.style.background =
        `linear-gradient(to right, rgb(0, ${g}, ${b}), rgb(255, ${g}, ${b}))`;

    greenSlider.style.background =
        `linear-gradient(to right, rgb(${r}, 0, ${b}), rgb(${r}, 255, ${b}))`;

    blueSlider.style.background =
        `linear-gradient(to right, rgb(${r}, ${g}, 0), rgb(${r}, ${g}, 255))`;
}

function startMemoryPhase() {
    statusText.textContent = "Memorize this color!";
    scoreText.textContent = "";

    controls.style.display = "none";
    colorBox.style.backgroundColor = toRgbString(targetColor);

    const startTime = Date.now();
    const totalTime = MEMORY_TIME * 1000;

    const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, totalTime - elapsedTime);
        const remainingSeconds = remainingTime / 1000;

        timerText.textContent = `Time left: ${remainingSeconds.toFixed(2)}`;

        if (remainingTime <= 0) {
            clearInterval(timer);
            startGuessPhase();
        }
    }, 10);
}

function startGuessPhase() {
    statusText.textContent = "Recreate the color!";
    timerText.textContent = "";

    controls.style.display = "flex";

    redSlider.value = 128;
    greenSlider.value = 128;
    blueSlider.value = 128;

    updateGuessColor();
}

function showResult() {
    const guessColor = {
        r: Number(redSlider.value),
        g: Number(greenSlider.value),
        b: Number(blueSlider.value)
    };

    const error = Math.sqrt(
        (targetColor.r - guessColor.r) ** 2 +
        (targetColor.g - guessColor.g) ** 2 +
        (targetColor.b - guessColor.b) ** 2
    );

    const maxError = Math.sqrt(
        Math.max(targetColor.r, 255 - targetColor.r) ** 2 +
        Math.max(targetColor.g, 255 - targetColor.g) ** 2 +
        Math.max(targetColor.b, 255 - targetColor.b) ** 2
    );

    const score = (100 * (1 - error / maxError)).toFixed(2);

    statusText.textContent = "Result";
    timerText.textContent = "";
    controls.style.display = "none";

    colorBox.style.backgroundColor = toRgbString(targetColor);

    scoreText.textContent = `Score: ${score} / 100`;
}

redSlider.addEventListener("input", updateGuessColor);
greenSlider.addEventListener("input", updateGuessColor);
blueSlider.addEventListener("input", updateGuessColor);

submitBtn.addEventListener("click", showResult);

startMemoryPhase();