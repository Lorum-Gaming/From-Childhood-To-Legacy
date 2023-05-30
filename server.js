const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Usuário %s conectado no servidor.", socket.id);

  socket.on("enter-room", (room) => {
    socket.join(room);
    console.log("Usuário %s entrou na sala %s.", socket.id, room);

    var players = {};

    if (io.sockets.adapter.rooms.get(room).size === 1) {
      players = {
        first: socket.id,
        second: undefined,
      };

      console.log("Sala %s com 1 jogador. Partida pronta para iniciar.", room);
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
    }

    io.to(room).emit("players", players);
  });

  socket.on("state-publish", (room, state) => {
    socket.broadcast.to(room).emit("state-notify", state);
  });

  socket.on("xps-publish", (room, xps) => {
    socket.broadcast.to(room).emit("xps-notify", xps);
  });

  socket.on("offer", (room, description) => {
    socket.broadcast.to(room).emit("offer", description);
  });

  socket.on("candidate", (room, candidate) => {
    socket.broadcast.to(room).emit("candidate", candidate);
  });

  socket.on("answer", (room, description) => {
    socket.broadcast.to(room).emit("answer", description);
  });

  socket.on("disconnect", () => {});
});

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
