export default class serverScene extends Phaser.Scene {
  constructor() {
    super("serverScene");
    this.serverButton01;
    this.serverButton02;
    this.serverButton03;
    this.serverButton04;
  }

  preload() {
    this.load.image("backgroundServer", "../../assets/screens/backgroundServer.png");

  }

  create() {
    this.button = this.add.image(400, 225, "backgroundServer")
            .setInteractive()

        this.button.on(
            "pointerdown",
            function () {
                this.button.destroy();
                this.game.scene.start("level01");
            },
            this
        )
  }

  update() {
    if (this.game.socket.connected) {
      this.game.socket.emit("scene", {
        scene: 2,
        player: this.game.socket.id,
      });
    }
  }
}
