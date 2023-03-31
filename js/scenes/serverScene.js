export default class serverScene extends Phaser.Scene {
  constructor() {
    super("serverScene");
    this.serverButton01;
    this.serverButton02;
    this.serverButton03;
    this.serverButton04;
  }

  preload() {
    this.load.image("backgroundServer", "../../assets/backgroundServer.png");

  }

  create() {
    this.add.image(400, 225, "backgroundServer");

    /*this.serverButton01 = this.add
        .image(100, 225, "server01", 0)
        .setInteractive();

    this.serverButton01.on(
      "pointerdown",
      function () {
        alert("Server 01");
        this.game.scene.start("level01");
      },

      this
    );*/

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
