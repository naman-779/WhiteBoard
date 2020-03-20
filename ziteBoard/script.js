const socket = io.connect("http://127.0.0.1:5500/lecture-19/ziteBoard/index.html");
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

const eraseAll = document.querySelector(".clear-all");
eraseAll.addEventListener("click", function(){
    ctx.clearRect(0, 0, board.width, board.height);
})
// function clearEverything(){
//     board.classList.remove("show")
// }

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