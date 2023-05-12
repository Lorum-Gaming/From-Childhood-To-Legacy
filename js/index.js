// Config
import config from "./config.js";

// Scenes
import menuScene from "./scenes/menuScene.js";
import serverScene from "./scenes/serverScene.js";
import level01 from "./scenes/level01.js";
import tutorial from "./scenes/tutorial.js";
import gameOver from "./scenes/gameOver.js";
import victory from "./scenes/victory.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    // WebSocket
    this.socket = io();
    this.socket.on("connect", () => {
      //this.socket.emit("enter-room", this.socket.id);
    });
    //
    // Scenes
    this.scene.add("menuScene", menuScene);
    this.scene.add("serverScene", serverScene);
    this.scene.add("level01", level01);
    this.scene.add("tutorial", tutorial);

    this.scene.add("gameOver", gameOver);
    this.scene.add("victory", victory);

    this.scene.start("menuScene");
  }
}

window.onload = () => {
  window.game = new Game();
};
