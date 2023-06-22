export default class menuScene extends Phaser.Scene {
  constructor() {
    super("menuScene");
    this.button;
  }

  preload() {
    this.load.image("backgroundImage", "./assets/screens/backgroundMenu.png");
    this.load.image("book", "./assets/interface/book.png");
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

    this.messageLore = this.add.image(50, 40, "book").setInteractive();

    this.messageLore.on(
      "pointerdown",
      function () {
        this.button.destroy();
        window.open("https://github.com/boidacarapreta/adcipt20231", "_blank");
      },
      this
    );
  }

  update() {}
}
