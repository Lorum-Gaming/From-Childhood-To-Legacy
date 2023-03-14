import {phase01} from './phase01.js';

export default class OpeningScene extends Phaser.Scene {
    constructor() {
        super("opening");

    }

    preload () {
        this.preload.image("backgroundImage", "../../assets/backgroundMenu.jpg");
    }

    create() {
        
        var button = this.add.image(800, 450, "backgroundImage", 0).setInteractive();

        button.on {
            "pointerdown",
            function () {
                this.scene.start(phase01);
            },
            this
        };
    };

    update() {

    }
}