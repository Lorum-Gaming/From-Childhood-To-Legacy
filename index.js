import config from './config.js';
import OpeningScene from './scene.js';

class Game extends Phaser.Game {
    constructor() {
        super(config);

        this.socket = io();
        this.socket.on("connect", () => {
            this.socket.emit("enter-room", this.socket.id);
        });

        this.scene.add("opening", OpeningScene);
        this.scene.start("opening");
    }
}

window.onload = () => {
    window.game = new Game();
}