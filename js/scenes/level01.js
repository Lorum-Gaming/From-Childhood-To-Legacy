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
    this.buttonAttack;
    this.buttonDash;
    this.buttonScreen;

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

    // XP
    this.xpCdr;
    this.xpDamage;
    this.xpResistance;
    this.xpVelocity;
    this.xpLife;
    this.xpVelocityAttack;

    // Coin
    this.coin;

    // Sound
    this.Level01Sound;
    this.XpSound;
    this.CoinSound;
  }

  preload() {
    this.load.image("BG", "../../assets/tiles/BG.png");
    this.load.image("chao", "../../assets/tiles/chao.png");
    this.load.image("obstaculo", "../../assets/tiles/obstaculo.png");

    this.load.tilemapTiledJSON("map", "../../assets/phases/level01.json");

    this.load.spritesheet(
      "player1",
      "../../assets/characters/player1/player1.png",
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet(
      "player2",
      "../../assets/characters/player2/player2.png",
      { frameWidth: 32, frameHeight: 32 }
    );

    this.load.spritesheet(
      "buttonLeft",
      "../../assets/interface/buttonLeft.png",
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet(
      "buttonRight",
      "../../assets/interface/buttonRight.png",
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet("buttonUp", "../../assets/interface/buttonJump.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet(
      "buttonAttack",
      "../../assets/interface/buttonAttack.png",
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet(
      "buttonDash",
      "../../assets/interface/buttonDash.png",
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet(
      "buttonScreen",
      "../../assets/interface/buttonScreen.png",
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet("xpCdr", "../../assets/objects/xpCdr.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("xpDamage", "../../assets/objects/xpDamage.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(
      "xpResistance",
      "../../assets/objects/xpResistance.png",
      { frameWidth: 16, frameHeight: 16 }
    );
    this.load.spritesheet("xpVelocity", "../../assets/objects/xpVelocity.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("xpLife", "../../assets/objects/xpLife.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(
      "xpVelocityAttack",
      "../../assets/objects/xpVelocityAttack.png",
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet("coin", "../../assets/objects/coin.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.audio("Level01Sound", "../../assets/sounds/Level01Sound.mp3");
    this.load.audio("XpSound", "../../assets/sounds/XpSound.mp3");
    this.load.audio("CoinSound", "../../assets/sounds/CoinSound.mp3");
  }

  create() {
    this.Level01Sound = this.sound.add("Level01Sound");
    this.Level01Sound.loop = true;
    this.Level01Sound.play();

    // Add Map and Platforms

    this.map = this.make.tilemap({ key: "map" });

    this.backgroundTileset = this.map.addTilesetImage("BG", "BG");
    this.floorTileset = this.map.addTilesetImage("chao", "chao");
    this.obstacleTileset = this.map.addTilesetImage("obstaculo", "obstaculo");

    this.background = this.map.createStaticLayer(
      "bg",
      this.backgroundTileset,
      0,
      0
    );
    this.floor = this.map.createStaticLayer("chao", this.floorTileset, 0, 0);
    this.obstacle = this.map.createStaticLayer(
      "obstaculo",
      this.obstacleTileset,
      0,
      0
    );

    this.floor.setCollisionByProperty({ colide: true });
    this.obstacle.setCollisionByProperty({ colide: true });

    if (this.game.players.first === this.game.socket.id) {
      this.local = "player1";
      this.player1 = this.physics.add.sprite(100, 50, this.local);

      this.remoto = "player2";
      this.player2 = this.physics.add.sprite(200, 50, this.local);
    } else {
      this.remoto = "player1";
      this.player2 = this.add.sprite(100, 50, this.remoto);

      this.local = "player2";
      this.player1 = this.physics.add.sprite(600, 225, this.local);
    }

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1, // loop
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 24,
        end: 31,
      }),
      frameRate: 10,
      repeat: -1, // loop
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 43,
        end: 43,
      }),
      frameRate: 10,
      repeat: -1, // loop
    });

    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 45,
        end: 45,
      }),
      frameRate: 10,
      repeat: -1, // loop
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 64,
        end: 71,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "dash",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 64,
        end: 71,
      }),
      frameRate: 20,
      delay: 20,
    });

    this.xpCdr = this.physics.add.sprite(200, 400, "xpCdr");
    this.xpDamage = this.physics.add.sprite(250, 400, "xpDamage");
    this.xpResistance = this.physics.add.sprite(300, 400, "xpResistance");
    this.xpVelocity = this.physics.add.sprite(350, 400, "xpVelocity");
    this.xpLife = this.physics.add.sprite(400, 400, "xpLife");
    this.xpVelocityAttack = this.physics.add.sprite(
      450,
      400,
      "xpVelocityAttack"
    );

    this.coin = this.physics.add.sprite(150, 400, "coin");

    this.anims.create({
      key: "xpCdr",
      frames: this.anims.generateFrameNumbers("xpCdr", {
        start: 0,
        end: 11,
      }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "xpDamage",
      frames: this.anims.generateFrameNumbers("xpDamage", {
        start: 0,
        end: 11,
      }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "xpResistance",
      frames: this.anims.generateFrameNumbers("xpResistance", {
        start: 0,
        end: 11,
      }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "xpVelocity",
      frames: this.anims.generateFrameNumbers("xpVelocity", {
        start: 0,
        end: 11,
      }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "xpLife",
      frames: this.anims.generateFrameNumbers("xpLife", {
        start: 0,
        end: 11,
      }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "xpVelocityAttack",
      frames: this.anims.generateFrameNumbers("xpVelocityAttack", {
        start: 0,
        end: 11,
      }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "coin",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 6,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.xpCdr.anims.play("xpCdr");
    this.xpDamage.anims.play("xpDamage");
    this.xpResistance.anims.play("xpResistance");
    this.xpVelocity.anims.play("xpVelocity");
    this.xpLife.anims.play("xpLife");
    this.xpVelocityAttack.anims.play("xpVelocityAttack");

    this.coin.anims.play("coin");

    this.player1.setCollideWorldBounds(true);

    this.physics.add.collider(this.player1, this.floor, null, null, this);
    this.physics.add.collider(
      this.player1,
      this.obstacle,
      this.colliderObstacle,
      null,
      this
    );

    this.physics.add.collider(this.xpCdr, this.floor, null, null, this);
    this.physics.add.collider(this.xpDamage, this.floor, null, null, this);
    this.physics.add.collider(this.xpResistance, this.floor, null, null, this);
    this.physics.add.collider(this.xpVelocity, this.floor, null, null, this);
    this.physics.add.collider(this.xpLife, this.floor, null, null, this);
    this.physics.add.collider(
      this.xpVelocityAttack,
      this.floor,
      null,
      null,
      this
    );

    this.physics.add.collider(this.coin, this.floor, null, null, this);

    this.physics.add.collider(
      this.player1,
      this.xpCdr,
      this.collectXPCdr,
      null,
      this
    );
    this.physics.add.collider(
      this.player1,
      this.xpDamage,
      this.collectXPDamage,
      null,
      this
    );
    this.physics.add.collider(
      this.player1,
      this.xpResistance,
      this.collectxpResistance,
      null,
      this
    );
    this.physics.add.collider(
      this.player1,
      this.xpVelocity,
      this.collectXPVelocity,
      null,
      this
    );
    this.physics.add.collider(
      this.player1,
      this.xpLife,
      this.collectXPLife,
      null,
      this
    );
    this.physics.add.collider(
      this.player1,
      this.xpVelocityAttack,
      this.collectXPVelocityAttack,
      null,
      this
    );

    this.physics.add.collider(
      this.player1,
      this.coin,
      this.collectCoin,
      null,
      this
    );

    this.XpSound = this.sound.add("XpSound");
    this.CoinSound = this.sound.add("CoinSound");

    // Add Camera
    this.cameras.main.setBounds(0, 0, 3072, 2048);
    this.physics.world.setBounds(0, 0, 3072, 2048);
    this.cameras.main.startFollow(this.player1);

    // Interface
    this.buttonRight = this.add
      .sprite(175, 375, "buttonRight", 0)
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
      .sprite(75, 375, "buttonLeft", 0)
      .setInteractive()
      .setScrollFactor(0)

      .on("pointerover", () => {
        this.buttonLeft.setFrame(1);

        this.player1.setFlipX(true);
        this.player1.setVelocityX(-this.P1Agility);
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
      .sprite(750, 375, "buttonUp", 0)
      .setInteractive()
      .setScrollFactor(0)

      .on("pointerover", () => {
        this.buttonUp.setFrame(1);
        this.player1.setVelocityY(-200);
        this.player1.anims.play("jump", true);
      })

      .on("pointerout", () => {
        this.buttonUp.setFrame(0);
        this.player1.anims.play("idle", true);
      });

    this.buttonAttack = this.add
      .sprite(750, 315, "buttonAttack", 0)
      .setInteractive()
      .setScrollFactor(0)

      .on("pointerdown", () => {
        this.player1.anims.stop();
        this.player1.anims.play("attack", true);
      })

      .on("pointerover", () => {
        this.buttonAttack.setFrame(1);
      })

      .on("pointerout", () => {
        this.buttonAttack.setFrame(0);

        this.player1.on(
          "animationcomplete-attack",
          () => {
            this.player1.anims.play("idle", true);
          },
          this
        );
      });

    this.buttonDash = this.add
      .sprite(675, 375, "buttonDash", 0)
      .setInteractive()
      .setScrollFactor(0)

      .on("pointerdown", () => {
        if (this.player1.anims.currentAnim.key === "idle") {
          if (this.player1.flipX) {
            this.player1.setVelocityX(-700);
          } else {
            this.player1.setVelocityX(700);
          }

          this.player1.anims.play("dash", true);

          setTimeout(() => {
            this.player1.setVelocityX(0);
          }, 100);
        }
      })

      .on("pointerover", () => {
        this.buttonDash.setFrame(1);
      })

      .on("pointerout", () => {
        this.buttonDash.setFrame(0);
        this.player1.anims.play("idle", true);
      });

    this.buttonScreen = this.add
      .sprite(750, 50, "buttonScreen", 0)
      .setInteractive()

      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      })
      .setScrollFactor(0);

    this.game.socket.on("state-notify", ({ frame, x, y }) => {
      this.player2.setFrame(frame);
      this.player2.x = x;
      this.player2.y = y;
    });

    this.game.socket.on();
  }

  update() {
    let frame;

    try {
      frame = this.player1.anims.getFrameName();
    } catch (e) {
      frame = 0;
    }

    this.game.socket.emit("state-publish", this.game.room, {
      frame: frame,
      x: this.player1.body.x + 32,
      y: this.player1.body.y + 32,
    });
  }

  collectXPCdr() {
    this.xpCdr.disableBody(true, true);
    this.XpSound.play();
  }

  collectXPDamage() {
    this.xpDamage.disableBody(true, true);
    this.XpSound.play();
  }

  collectxpResistance() {
    this.xpResistance.disableBody(true, true);
    this.XpSound.play();
  }

  collectXPVelocity() {
    this.xpVelocity.disableBody(true, true);
    this.XpSound.play();
  }

  collectXPLife() {
    this.xpLife.disableBody(true, true);
    this.XpSound.play();
  }

  collectXPVelocityAttack() {
    this.xpVelocityAttack.disableBody(true, true);
    this.XpSound.play();
  }

  collectCoin() {
    this.coin.disableBody(true, true);
    this.CoinSound.play();
  }

  colliderObstacle() {
    //alert("Player Die");
    this.player1.x = 100;
  }
}
