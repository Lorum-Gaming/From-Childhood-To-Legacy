// Scenes
//import phase01 from "./scenes/phase01.js";

export default class serverScene extends Phaser.Scene {
  constructor() {
    super("serverScene");
    this.serverButton01;
    this.serverButton02;
    this.serverButton03;
    this.serverButton04;
  }

  preload() {
    this.load.image("backgroundImage", "../../assets/backgroundServer.png");
    this.load.image("server01", "../../assets/servers/1.png");
    this.load.image("server02", "../../assets/servers/2.png");
    this.load.image("server03", "../../assets/servers/3.png");
    this.load.image("server04", "../../assets/servers/4.png");
    alert("Enter in ServerScene");
  }

  create() {
    this.add.image(400, 225, "backgroundImage");

    this.serverButton01 = this.add
      .image(100, 225, "server01", 0)
      .setInteractive();
    this.serverButton02 = this.add
      .image(300, 225, "server02", 0)
      .setInteractive();
    this.serverButton03 = this.add
      .image(500, 225, "server03", 0)
      .setInteractive();
    this.serverButton04 = this.add
      .image(700, 225, "server04", 0)
      .setInteractive();

    this.serverButton01.on(
      "pointerdown",
      function () {
        alert("Server 01");
        this.game.scene.start("phase01");
      },

      this
    );

    this.serverButton02.on(
      "pointerdown",
      function () {
        alert("Server 02");
      },

      this
    );

    this.serverButton03.on(
      "pointerdown",
      function () {
        alert("Server 03");
      },

      this
    );

    this.serverButton04.on(
      "pointerdown",
      function () {
        alert("Server 04");
      },

      this
    );
  }

  update() {
    if (this.game.socket.connected) {
      this.game.socket.emit("scene", {
        scene: 1,
        player: this.game.socket.id,
      });
    }
  }
}
