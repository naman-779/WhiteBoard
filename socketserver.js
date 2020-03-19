const express = require("express");

const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server);

app.use(express.static("ziteBoard"));

io.on("connection", function(socket){
    // console.log(socket.id);
    socket.on("color", function(color){
        console.log("color");
        socket.emit("onColorChange", color);
    });
    socket.on("mousedown", function(point){
        socket.broadcast.emit("onmousedown", point);
    });
    socket.on("mousemove", function(point){
        socket.broadcast.emit("onmousemove", point);
    });
})
const port = process.env.PORT||3000;

server.listen(port, function(req, res){
    console.log("Server is listening at port 3000");
})

