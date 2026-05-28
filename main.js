const redSlider = document.querySelector("#red");
const greenSlider = document.querySelector("#green");
const blueSlider = document.querySelector("#blue");

const redValue = document.querySelector("#redValue");
const greenValue = document.querySelector("#greenValue");
const blueValue = document.querySelector("#blueValue");

const colorBox = document.querySelector("#colorBox");

function updateColor() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;

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

redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);

updateColor();