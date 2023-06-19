export default class menuScene extends Phaser.Scene {
  constructor() {
    super("menuScene");
    this.button;
  }

  preload() {
    this.load.image(
      "backgroundImage",
      "./assets/screens/backgroundMenu.png"
    );
  }

  create() {
    this.button = this.add.image(400, 225, "backgroundImage").setInteractive();

    this.button.on(
      "pointerdown",
      function () {
        this.button.destroy();
        this.game.scene.start("serverScene");
      },
      this
    );
  }

  update() {}
}
