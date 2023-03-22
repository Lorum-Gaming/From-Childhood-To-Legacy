export default class level01 extends Phaser.Scene {
  constructor() {
    super("level01");
    this.map;
    this.tileset;
    this.platforms;
    this.cameras;

    // Variables Player1
    this.player1;
    this.P1Jump = false;
    this.P1JumpDelay = 0;
    this.P1Position = "right"; // Player turn right or left

    // Keys
    this.cursors;
    this.keyW;
    this.keyA;
    this.keyS;
    this.keyD;
    this.keyP;
    this.keyENTER;


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
      key: 'run',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 24, end: 31
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 43, end: 43
      }),
      frameRate: 10,
      repeat: -1,  // loop
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 45, end: 45
      }),
      frameRate: 10,
      repeat: -1  // loop
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 64, end: 71
      }),
      frameRate: 20,
      delay: 20,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.cameras.main.setBounds(0, 0, 4096, 512);
    this.physics.world.setBounds(0, 0, 4096, 512);
    this.cameras.main.startFollow(this.player1);
  }

  update() {
    if (this.game.socket.connected) {
      this.game.socket.emit("scene", {
        scene: 3,
        player: this.game.socket.id,
      });
    }

    if (this.P1Jump === true){
      this.P1JumpDelay ++;
    }

    // Jump Idle
    if (this.cursors.up.isDown && this.player1.body.blocked.down) {
      
      this.player1.setVelocityY(-350);
      this.P1Jump == true;

    } else if ( // Attack Left
      this.keyENTER.isDown &&
      this.cursors.down.isUp &&
      this.player1.body.blocked.down &&
      this.P1Position === "left"
    ) {

      this.player1.setFlipX(true);
      this.player1.setVelocityX(0);
      this.player1.anims.play("attack", true);
      
    } else if ( // Attack Right
      this.keyENTER.isDown &&
      this.cursors.down.isUp &&
      this.player1.body.blocked.down &&
      this.P1Position === "right"
    ) {

      this.player1.setFlipX(false);
      this.player1.setVelocityX(0);
      this.player1.anims.play("attack", true);

    } else if ( // Jump Left

      this.player1.body.velocity.y < 0 &&
      this.cursors.left.isUp &&
      this.cursors.right.isUp &&
      this.P1Position === "left"

    ) {

      this.player1.setFlipX(true);
      this.player1.setVelocityX(0);
      this.player1.anims.play("jump", true);

    } else if ( // Jump Right
      
      this.player1.body.velocity.y < 0 &&
      this.cursors.left.isUp &&
      this.cursors.right.isUp &&
      this.P1Position === "right"

    ) {

      this.player1.setFlipX(false);
      this.player1.setVelocityX(0);
      this.player1.anims.play("jump", true);

    } else if (this.player1.body.velocity.y < 0 && this.cursors.left.isDown) { // Jump Left Move

      this.player1.setFlipX(true);
      this.player1.setVelocityX(-60);
      this.player1.anims.play("jump", true);
      this.P1Position = "left";

    } else if (this.player1.body.velocity.y < 0 && this.cursors.right.isDown) { // Jump Right Move

      this.player1.setFlipX(false);
      this.player1.setVelocityX(60);
      this.player1.anims.play("jump", true);
      this.P1Position = "right";

    } else if (this.player1.body.velocity.y > 0 && this.cursors.left.isDown) { // Fall Left Move

      this.player1.setFlipX(true);
      this.player1.setVelocityX(-60);
      this.player1.anims.play("fall", true);
      this.P1Position = "left";

    } else if (this.player1.body.velocity.y > 0 && this.cursors.right.isDown) { // Fall Right Move

      this.player1.setFlipX(false);
      this.player1.setVelocityX(60);
      this.player1.anims.play("fall", true);
      this.P1Position = "right";

    }
    
    else if ( // Fall Left
      
      !this.player1.body.blocked.down &&
      this.player1.body.velocity.y > 0 &&
      this.cursors.left.isUp &&
      this.P1Position === "left"

    ) {

      this.player1.setFlipX(true);
      this.player1.setVelocityX(0);
      this.player1.anims.play("fall", true);

    } else if ( // Fall Right
      
      !this.player1.body.blocked.down &&
      this.player1.body.velocity.y > 0 &&
      this.cursors.right.isUp &&
      this.P1Position === "right"

    ) {

      this.player1.setFlipX(false);
      this.player1.setVelocityX(0);
      this.player1.anims.play("fall", true);

    } else if (this.cursors.left.isDown && this.player1.body.blocked.down) { //Run Left

      this.player1.setFlipX(true);
      this.player1.setVelocityX(-60);
      this.player1.anims.play("run", true);
      this.P1Position = "left";

    } else if (this.cursors.right.isDown && this.player1.body.blocked.down) { //Run Right

      this.player1.setFlipX(false);
      this.player1.setVelocityX(60);
      this.player1.anims.play("run", true);
      this.P1Position = "right";

    } else if ( // Idle Left
      
      this.player1.body.blocked.down && 
      this.cursors.right.isUp &&
      this.cursors.left.isUp &&
      this.keyENTER.isUp &&
      this.cursors.down.isUp &&
      this.P1Position === "left"

    ) {

      this.player1.setFlipX(true);
      this.player1.setVelocityX(0);
      this.player1.anims.play("idle", true);

    } else if ( // Idle Right
      
      this.player1.body.blocked.down &&
      this.cursors.right.isUp &&
      this.cursors.left.isUp &&
      this.keyENTER.isUp &&
      this.cursors.down.isUp &&
      this.P1Position === "right"

    ) {

      this.player1.setFlipX(false);
      this.player1.setVelocityX(0);
      this.player1.anims.play("idle", true);
    }

    if (this.cursors.up.isDown && this.player1.body.touching.down) {
      this.player1.setVelocityY(-450);
    }

  }
}

// https://github.com/piyinyang/yinyang/blob/master/GameScene.js