import menuScene from './scenes/menuScene.js';
import serverScene from './scenes/serverScene.js';
import phase01 from './scenes/phase01.js';

export default {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "game-container",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 450,
    },
    scene: [menuScene, serverScene, phase01],
    
};