const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
    socket.on("enter-room", (id) => {
        console.log(`Player ${id} enter in room`);
    });

    socket.on("scene", ({player, scene}) => {
        console.log(`Player ${player} in scene ${scene}`);
    });
})

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));