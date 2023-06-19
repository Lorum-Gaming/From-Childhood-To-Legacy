export default class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
    this.button;
  }

  preload() {
    this.load.image("gameOverImage", "./assets/screens/gameOver.png");
  }

  create() {
    this.button = this.add.image(400, 225, "gameOverImage").setInteractive();

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
