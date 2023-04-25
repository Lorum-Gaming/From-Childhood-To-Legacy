export default class level01 extends Phaser.Scene {
  constructor() {
    super("level01");
    this.map;
    this.backgroundTileset;
    this.floorTileset;
    this.obstacleTileset;
    this.cameras;
    this.isKeyboard = false;

    // Interface
    this.buttonLeft;
    this.buttonRight;
    this.buttonUp;

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

    // Variables Player2
    this.player2;

  }

  preload() {

    this.load.image("BG", "../../assets/tiles/BG.png");
    this.load.image("chao", "../../assets/tiles/chao.png");
    this.load.image("obstaculo", "../../assets/tiles/obstaculo.png");

    this.load.tilemapTiledJSON("map", "../../assets/phases/level01.json");

    this.load.spritesheet('player1', '../../assets/characters/player1/player1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player2', '../../assets/characters/player2/player2.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet("buttonUp", "../../assets/interface/buttonUp.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("buttonLeft", "../../assets/interface/buttonLeft.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("buttonRight", "../../assets/interface/buttonRight.png", { frameWidth: 64, frameHeight: 64 });
  }

  create() {

    // Add Map and Platforms
    
    this.map = this.make.tilemap({ key: "map" });

    this.backgroundTileset = this.map.addTilesetImage("BG", "BG");
    this.floorTileset = this.map.addTilesetImage("chao", "chao");
    this.obstacleTileset = this.map.addTilesetImage("obstaculo", "obstaculo");

    this.background = this.map.createStaticLayer("bg", this.backgroundTileset, 0, 0);
    this.floor = this.map.createStaticLayer("chao", this.floorTileset, 0, 0);
    this.obstacle = this.map.createStaticLayer("obstaculo", this.obstacleTileset, 0, 0)
    
    this.floor = this.map.createLayer("chao", this.floorTileset, 0, 0);
    this.obstacle = this.map.createLayer("obstaculo", this.obstacleTileset, 0, 0);

    this.floor.setCollisionByProperty({ colide: true });
    this.obstacle.setCollisionByProperty({ colide: true });

    this.player1 = this.physics.add.sprite(100, 50, 'player1');
    this.player2 = this.physics.add.sprite(100, 50, 'player2');
    
    this.player1.setCollideWorldBounds(true);

    this.physics.add.collider(this.player1, this.floor, null, null, this);
    this.physics.add.collider(this.player1, this.obstacle, null, null, this);

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

    // Add Camera
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