export default class victory extends Phaser.Scene {
  constructor() {
    super("victory");
    this.button;
  }

  preload() {
    this.load.image("victoryImage", "./assets/screens/victory.png");
  }

  create() {
    this.button = this.add.image(400, 225, "victoryImage").setInteractive();

    this.button.on(
      "pointerdown",
      function () {
        this.button.destroy();
        this.game.scene.start("menuScene");
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
