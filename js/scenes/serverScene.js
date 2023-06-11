export default class serverScene extends Phaser.Scene {
  constructor() {
    super("serverScene");
    this.background;
  }

  preload() {
    this.load.image(
      "backgroundServer",
      "../../assets/screens/backgroundServer.png"
    );
  }

  create() {
    this.background = this.add.image(400, 225, "backgroundServer");

    this.message = this.add.text(215, 75, "", {
      fontFamily: "monospace",
      font: "24px Courier",
      fill: "#cccccc",
    });

    this.servers = [
      {
        number: "0",
        x: 200,
        y: 75,
        button: undefined,
      },
      {
        number: "1",
        x: 200,
        y: 135,
        button: undefined,
      },
      {
        number: "2",
        x: 200,
        y: 195,
        button: undefined,
      },
      {
        number: "3",
        x: 200,
        y: 255,
        button: undefined,
      },
      {
        number: "4",
        x: 200,
        y: 315,
        button: undefined,
      },
      {
        number: "5",
        x: 450,
        y: 75,
        button: undefined,
      },
      {
        number: "6",
        x: 450,
        y: 135,
        button: undefined,
      },
      {
        number: "7",
        x: 450,
        y: 195,
        button: undefined,
      },
      {
        number: "8",
        x: 450,
        y: 255,
        button: undefined,
      },
      {
        number: "9",
        x: 450,
        y: 315,
        button: undefined,
      },
    ];

    this.servers.forEach((item) => {
      item.button = this.add
        .text(item.x, item.y, "[Sala " + item.number + "]", {
          fontFamily: "monospace",
          font: "32px Courier",
          fill: "#cccccc",
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.servers.forEach((item) => {
            item.button.destroy();
          });
          this.game.room = item.number;
          this.game.socket.emit("enter-room", this.game.room);
        });
    });

    this.game.socket.on("players", (players) => {
      console.log(players);

      if (players.second) {
        this.message.destroy();
        this.game.players = players;
        this.game.scene.start("level01");
      } else if (players.first) {
        this.background.destroy();
        this.message.setText("Aguardando segundo jogador...");

        /* Capture audio */
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            console.log(stream);
            this.game.midias = stream;
          })
          .catch((error) => console.log(error));
      }
    });
  }

  upload() {}
}
