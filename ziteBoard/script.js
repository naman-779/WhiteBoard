const socket = io.connect("http://localhost:3000");
const board = document.querySelector(".board");
board.height = window.innerHeight;
board.width = window.innerWidth;
const ctx = board.getContext("2d");
ctx.strokeStyle = "blue";
ctx.imageSmoothingEnabled = true;
const input = document.querySelector("#pen-size");
ctx.lineWidth = input.value;

input.addEventListener("change", function () {
    ctx.lineWidth = input.value;
})
let Activetool = "pencil";
const pencilOptions = document.querySelector(".pencil");
const eraserOptions = document.querySelector(".eraser");

function handleToolChange(tool) {
    if (tool == "pencil") {
        if (Activetool == "pencil") {
            pencilOptions.classList.add("show");
        } else {
            Activetool = "pencil";
            eraserOptions.classList.remove("show");
            ctx.strokeStyle = "blue";
        }
    } else if (tool == "eraser") {
        if (Activetool == "eraser") {
            eraserOptions.classList.add("show")
        } else {
            Activetool = "eraser";
            pencilOptions.classList.remove("show");
            ctx.strokeStyle = "white";
        }
    }
    else if (tool == "sticky") {
        createSticky();
    }
}
function handleColorChange(color) {
    ctx.strokeStyle = color;
}