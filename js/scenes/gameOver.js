export default class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
    this.button;
  }

  preload() {
    this.load.image("gameOverImage", "./assets/screens/gameOver.png");
  }

  create() {
    this.bg = this.add.image(400, 225, "gameOverImage");

    this.messageRestart = this.add
      .text(175, 250, "[Voltar ao Menu]", {
        fontFamily: "monospace",
        font: "24px Courier",
        fill: "#cccccc",
      })
      .setInteractive();

    this.messageLore = this.add
      .text(450, 250, "[Veja a Lore]", {
        fontFamily: "monospace",
        font: "24px Courier",
        fill: "#cccccc",
      })
      .setInteractive();

    this.messageRestart.on(
      "pointerdown",
      function () {
        this.messageRestart.destroy();
        this.messageLore.destroy();
        this.bg.destroy();
        this.game.scene.start("menuScene");
      },
      this
    );

    this.messageLore.on(
      "pointerdown",
      function () {
        this.messageRestart.destroy();
        this.messageLore.destroy();
        this.bg.destroy();
        window.open("https://github.com/boidacarapreta/adcipt20231", "_blank");
      },
      this
    );
  }

  update() {
    if (this.game.socket.connected) {
      this.game.socket.emit("scene", {
        scene: 4,
        player: this.game.socket.id,
      });
    }
  }
}
