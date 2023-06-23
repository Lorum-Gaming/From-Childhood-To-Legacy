// Config
import config from "./config.js";

// Scenes
import menuScene from "./scenes/menuScene.js";
import serverScene from "./scenes/serverScene.js";
import level01 from "./scenes/level01.js";
import gameOver from "./scenes/gameOver.js";
import victory from "./scenes/victory.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    let iceServers;
    if (window.location.host === "ifsc.digital") {
      this.socket = io.connect({ path: "/God-Between-Us/socket.io/" });

      iceServers = [
        {
          urls: "stun:ifsc.digital",
        },
        {
          urls: "turns:ifsc.digital",
          username: "adcipt",
          credential: "adcipt20231",
        },
      ];
    } else {
      this.socket = io();

      iceServers = [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ];
    }

    this.ice_servers = { iceServers };
    this.audio = document.querySelector("audio");

    // Scenes
    this.scene.add("menuScene", menuScene);
    this.scene.add("serverScene", serverScene);
    this.scene.add("level01", level01);

    this.scene.add("gameOver", gameOver);
    this.scene.add("victory", victory);

    this.scene.start("menuScene");
  }
}

window.onload = () => {
  window.game = new Game();
};
