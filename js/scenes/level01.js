export default class level01 extends Phaser.Scene {
  constructor() {
    super("level01");
    this.map;
    this.tileset;
    this.platforms;
  }

  preload() {
    // alert("Enter in Level 01");
    this.load.image("backgroundLevel01", "../../assets/backgroundLevel01.png");
  
    this.load.image("tiles", "../../assets/tiles.png");
    

    this.load.tilemapTiledJSON("map", "../../assets/level1.json");
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });

    this.tileset = this.map.addTilesetImage("platformer", "tiles");

    this.add.image(400, 225, "backgroundLevel01", 0);
  
    this.platforms = this.map.createLayer('Platforms', this.tileset, 0, 150);

    this.platforms.setCollisionByExclusion(-1, true);
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
