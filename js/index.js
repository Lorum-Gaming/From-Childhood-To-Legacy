// Config
import config from "./config.js";
//
// Scenes
import serverScene from "./scenes/serverScene.js";
import phase01 from "./scenes/phase01.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    // WebSocket
    this.socket = io();
    this.socket.on("connect", () => {
      this.socket.emit("enter-room", this.socket.id);
    });
    //
    // Scenes
    this.scene.add("serverScene", serverScene);
    this.scene.add("phase01", phase01);
    this.scene.start("serverScene");
  }
}

window.onload = () => {
  window.game = new Game();
};
