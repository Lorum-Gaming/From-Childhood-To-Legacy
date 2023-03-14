import config from './config.js';
// import menuScene from './scenes/menuScene.js';
import phase01 from './scenes/phase01.js';
 
class Game extends Phaser.Game {
    constructor() {
        super(config);

        this.socket = io();
        
        this.socket.on("connect", () => {
            this.socket.emit("enter-room", this.socket.id);
        });

        this.scene.add("phase01", phase01);

        this.scene.start("phase01");
    }
}

window.onload = () => {
    window.game = new Game();
}