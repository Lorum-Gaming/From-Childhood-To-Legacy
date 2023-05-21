const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("enter-room", (room) => {
    socket.join(room);
    console.log(`Player ${room} enter in room`);

    var players = {};

    if (io.sockets.adapter.rooms.get(room).size === 1) {
      players = {
        first: socket.id,
        second: undefined,
      };
    } else if (io.sockets.adapter.rooms.get(room).size === 2) {
      let [first] = io.sockets.adapter.rooms.get(room);

      players = {
        first: first,
        second: socket.id,
      };

      console.log(
        "Sala %s com 2 jogadores. Partida pronta para iniciar.",
        room
      );

      io.to(room).emit("players", players);
    }
  });

  socket.on("state-publish", (room, state) => {
    socket.broadcast.to(room).emit("state-notify", state);
  });

  socket.on("xps-publish", (room, xps) => {
    socket.broadcast.to(room).emit("xps-notify", xps);
  });

  socket.on("disconnect", () => {});
});

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
