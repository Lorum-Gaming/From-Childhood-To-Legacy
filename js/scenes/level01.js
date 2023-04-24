export default class level01 extends Phaser.Scene {
  constructor() {
    super("level01");
    this.map;
    this.tileset;
    this.platforms;
    this.cameras;
    this.coinText;
    this.isKeyboard = false;

    // Interface
    this.buttonLeft;
    this.buttonRight;
    this.buttonUp;
    this.buttonLeft;

    // Variables Player1
    this.player1;
    this.P1Jump = false;
    this.P1JumpDelay = 0;
    this.P1Position = "right"; // Player turn right or left
    this.P1Coins = 0;

    this.P1Force = 10;
    this.P1Resistence = 1;
    this.P1AttackSpeed = 1;
    this.P1Agility = 160;
    this.P1Life = 100;
    this.P1LifeMax = 150;

    this.P1LifeText;
    this.P1LifeBox;
    this.P1LifeMaxBox;

    // Variables Player2
    this.player2;
    this.P2Jump = false;
    this.P2JumpDelay = 0;
    this.P2Position = "right"; // Player turn right or left
    this.P2Coins = 0;

    this.P2Force = 10;
    this.P2Resistence = 1;
    this.P2AttackSpeed = 1;
    this.P2Agility = 160;
    this.P2Life = 100;
    this.P2LifeMax = 150;

    this.P2LifeText;
    this.P2LifeBox;
    this.P2LifeMaxBox;

    // Keys
    this.cursors;
    this.keyW;
    this.keyA;
    this.keyS;
    this.keyD;
    this.keyP;
    this.keyENTER;

    // Audio
    this.musicBackground;

  }

  preload() {

    this.load.image("backgroundLevel01", "../../assets/backgroundLevel01.png");
  
    this.load.image("tiles", "../../assets/tiles.png");

    this.load.tilemapTiledJSON("map", "../../assets/level1.json");

    this.load.spritesheet('player1', '../../assets/characters/player1/player1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player2', '../../assets/characters/player2/player2.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet("buttonUp", "../../assets/interface/buttonUp.png", { frameWidth: 64,frameHeight: 64 });
    this.load.spritesheet("buttonDown", "../../assets/interface/buttonDown.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("buttonLeft", "../../assets/interface/buttonLeft.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("buttonRight", "../../assets/interface/buttonRight.png", { frameWidth: 64, frameHeight: 64 });

    this.load.audio("musicBackground", "../../assets/audio/musicBackground.mp3");
  }

  create() {

    this.musicBackground = this.sound.add("musicBackground", {
      volume: 0.2,
    });

    this.musicBackground.play();

    this.add.image(400, 225, "backgroundLevel01", 0);

    // Add Map and Platforms
    
    this.map = this.make.tilemap({ key: "map" });

    this.tileset = this.map.addTilesetImage("tiles", "tiles");
    
    this.platforms = this.map.createLayer("platforms", this.tileset, 0, 150);
    this.platforms.setCollisionByProperty({ collides: true });

    this.player1 = this.physics.add.sprite(100, 50, 'player1');
    this.player2 = this.physics.add.sprite(100, 50, 'player2');
    
    this.player1.setCollideWorldBounds(true);
    this.player2.setCollideWorldBounds(true);

    this.physics.add.collider(this.player1, this.platforms, null, null, this);
    this.physics.add.collider(this.player2, this.platforms, null, null, this);
    
    /*
      Tasks
        -> Action one time with time 
        -> Dash (princesas perdidas) 
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

    // Add Cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    // Add Camera
    this.cameras.main.setBounds(0, 0, 4096, 512);
    this.physics.world.setBounds(0, 0, 4096, 512);
    this.cameras.main.startFollow(this.player1);

    this.P1LifeMaxBox = this.add.rectangle(100, 24, this.P1LifeMax, 15, 0x000000).setScrollFactor(0);
    this.P1LifeBox = this.add.rectangle(75, 24, this.P1Life, 15, 0x008800).setScrollFactor(0);
  
    // Add life counter
    this.P1LifeText = this.add.text(70, 17.5, `${this.P1Life} / ${this.P1LifeMax}`, {
      fontSize: '12px',
      fill: "#fff"
    })

    // Add coins counter
    this.coinText = this.add.text(650, 20, `Coins: ${this.P1Coins}`, {
      fontSize: '24px',
      fill: "#000"
    })

    this.P1LifeText.setScrollFactor(0); // Fixe in Screen
    this.coinText.setScrollFactor(0); // Fixe in Screen
  }

  update() {
    if (this.game.socket.connected) {
      this.game.socket.emit("scene", {
        scene: 3,
        player: this.game.socket.id,
      });
    }

    if (this.isKeyboard) {

      // Jump Idle
      if (this.cursors.up.isDown && this.player1.body.blocked.down) {
        
        this.player1.setVelocityY(-250);
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
        this.player1.setVelocityX(- this.P1Agility);
        this.player1.anims.play("jump", true);
        this.P1Position = "left";

      } else if (this.player1.body.velocity.y < 0 && this.cursors.right.isDown) { // Jump Right Move

        this.player1.setFlipX(false);
        this.player1.setVelocityX(this.P1Agility);
        this.player1.anims.play("jump", true);
        this.P1Position = "right";

      } else if (this.player1.body.velocity.y > 0 && this.cursors.left.isDown) { // Fall Left Move

        this.player1.setFlipX(true);
        this.player1.setVelocityX(- this.P1Agility);
        this.player1.anims.play("fall", true);
        this.P1Position = "left";

      } else if (this.player1.body.velocity.y > 0 && this.cursors.right.isDown) { // Fall Right Move

        this.player1.setFlipX(false);
        this.player1.setVelocityX(this.P1Agility);
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
        this.player1.setVelocityX(- this.P1Agility);
        this.player1.anims.play("run", true);
        this.P1Position = "left";

      } else if (this.cursors.right.isDown && this.player1.body.blocked.down) { //Run Right

        this.player1.setFlipX(false);
        this.player1.setVelocityX(this.P1Agility);
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

    } else {

      // Interface
      this.buttonRight = this.add
        .sprite(175, 300, "buttonRight", 0)
        .setInteractive()
        .setScrollFactor(0)

        .on("pointerover", () => {
          this.buttonRight.setFrame(1);

          this.player1.setFlipX(false);
          this.player1.setVelocityX(this.P1Agility);
          this.player1.anims.play("run", true);
          this.P1Position = "right";
        })

        .on("pointerout", () => {
          this.buttonRight.setFrame(0);

          this.player1.setFlipX(false);
          this.player1.setVelocityX(0);
          this.player1.anims.play("idle", true);
        });

      this.buttonLeft = this.add
        .sprite(75, 300, "buttonLeft", 0)
        .setInteractive()
        .setScrollFactor(0)

        .on("pointerover", () => {
          this.buttonLeft.setFrame(1);

          this.player1.setFlipX(true);
          this.player1.setVelocityX(- this.P1Agility);
          this.player1.anims.play("run", true);
          this.P1Position = "left";
        })
            
        .on("pointerout", () => {
          this.buttonLeft.setFrame(0);

          this.player1.setFlipX(true);
          this.player1.setVelocityX(0);
          this.player1.anims.play("idle", true);
        });

        this.buttonUp = this.add
        .sprite(500, 300, "buttonUp", 0)
        .setInteractive()
        .setScrollFactor(0)

        .on("pointerover", () => {
          this.buttonUp.setFrame(1);

          this.player1.setVelocityY(-200);
        })
            
        .on("pointerout", () => {
          this.buttonUp.setFrame(0);

         
        });

        
      }    
  }
}

// https://github.com/piyinyang/yinyang/blob/master/GameScene.js