export default class level01 extends Phaser.Scene {
  constructor() {
    super("level01");
    this.map;
    this.tileset;
    this.platforms;
    this.player1;
    this.cursors;
    this.debugGraphics;
  }

  preload() {
    // alert("Enter in Level 01");
    this.load.image("backgroundLevel01", "../../assets/backgroundLevel01.png");
  
    this.load.image("tiles", "../../assets/tiles.png");

    this.load.tilemapTiledJSON("map", "../../assets/level1.json");

    this.load.spritesheet('player1', '../../assets/characters/player1/player1.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {

    this.add.image(400, 225, "backgroundLevel01", 0);

    // Add Map and Platforms
    
    this.map = this.make.tilemap({ key: "map" });

    this.tileset = this.map.addTilesetImage("tiles", "tiles");
    
    this.platforms = this.map.createLayer("platforms", this.tileset, 0, 150);
    this.platforms.setCollisionByProperty({ collides: true });

    this.player1 = this.physics.add.sprite(100, 50, 'player1');

    this.player1.setBounce(0.2);
    this.player1.setCollideWorldBounds(true);

    this.physics.add.collider(this.player1, this.platforms, null, null, this);
    
    /*
      Tasks
        -> Action one time with time 
        -> Animation Reverse (fazer no tileset)
        -> Dash (princesas perdidas) 
        -> Tiles collider (collide)
        -> Reset Background in Scenes () 
        
        Descendente
    */

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 0, end: 1
      }),
      frameRate: 5,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 24, end: 31
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 24, end: 31
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 32, end: 35
      }),
      frameRate: 20,
    });

    this.anims.create({
      key: 'downUp',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 36, end: 37
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 40, end: 43
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 44, end: 45
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'teleportGo',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 48, end: 51
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'teleportReturn',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 48, end: 51
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 64, end: 71
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (this.game.socket.connected) {
      this.game.socket.emit("scene", {
        scene: 3,
        player: this.game.socket.id,
      });
    }


    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-160);
      this.player1.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player1.setVelocityX(160);
      this.player1.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player1.anims.play('teleportGo', true);
      this.player1.setVelocityY(-500);
      //this.player.setPosition(this.player.positionX+20, this.player.positionY)

    } else if (this.cursors.down.isDown) {
      setTimeout(3000)
      this.player1.anims.play('down', true);


    } else {
      this.player1.setVelocityX(0);
      this.player1.anims.play('idle', true);
    }

    if (this.cursors.up.isDown && this.player1.body.touching.down) {
      this.player1.setVelocityY(-450);
    }

  }
}

// 