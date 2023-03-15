export default class phase01 extends Phaser.Scene {
  constructor() {
    super("phase01");
  }

  preload() {
    alert("Enter in Phase 01");
  }

  create() {}

  update() {
    if (this.game.socket.connected) {
      this.game.socket.emit("scene", {
        scene: 2,
        player: this.game.socket.id,
      });
    }
  }
}
