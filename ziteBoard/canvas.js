let isMouseDown = false;
let undoStack = [];

let redoStack=[];
board.addEventListener("mousedown", function (e) {

    ctx.beginPath();
    let x = e.clientX;
    let y = e.clientY - board.getBoundingClientRect().y;
    ctx.moveTo(x, y);
    let point = {
        x: x,
        y: y,
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        type: "start"
    }
    undoStack.push(point)
    isMouseDown = true;
    socket.emit("mymousedown",point);
})

board.addEventListener("mousemove", function (e) {
    
    if (isMouseDown == true) {
        let x = e.clientX;
        let y = e.clientY - board.getBoundingClientRect().y;
        ctx.lineTo(x, y);

        ctx.stroke();
        let point = {
            x: x,
            y: y,
            color: ctx.strokeStyle,
            width: ctx.lineWidth,
            type: "end"
        }
        undoStack.push(point);
        socket.emit("mymousemove",point)

    }
})
board.addEventListener("mouseup", function (e) {
    isMouseDown = false;
    socket.emit("mymouseup");
})

let undo = document.querySelector(".undo-tool");
let redo = document.querySelector(".redo-tool");
let interval = null;

undo.addEventListener("mousedown", function (e) {

    let myfn = function () {
        redoStack.push(undoStack.pop());
        redraw();
    }
    interval = setInterval(function () {
        myfn();
    }, 50);
})

undo.addEventListener("mouseup",function(){
    clearInterval(interval);
})
redo.addEventListener("mousedown",function(){
    let myfn = function () {
        undoStack.push(redoStack.pop());
        redraw();
    }
    interval = setInterval(function () {
        myfn();
    }, 50);
    
})
redo.addEventListener("mouseup",function(){
    clearInterval(interval);
})

function redraw() {
    ctx.clearRect(0, 0, board.width, board.height);

    for (let i = 0; i < undoStack.length; i++) {
        let { x, y, color, type, width } = undoStack[i];
        if (type == "start") {
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, y);

        } else if (type == "end") {
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.lineTo(x, y);
            ctx.stroke();
        }

    }

}