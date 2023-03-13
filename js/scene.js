export default class OpeningScene extends Phaser.Scene {
    constructor() {
        super("opening");
        this.platforms;
        this.cursors;
        this.player;
        this.gameOver = false;
    }

    preload () {
        this.load.image('background', 'assets/packageSprites/background.png');
        this.load.image('overlay', 'assets/packageSprites/overlay.png');


        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/dude.png',
        { frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('dudeLeft', 'assets/dudeLeft.png',
        { frameWidth: 32, frameHeight: 32});
    }

    create() {
        this.add.image(500, 300, 'background');
        this.add.image(400, 400, 'overlay');


        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(3).refreshBody();
    
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    
        this.player = this.physics.add.sprite(100, 450, 'dude').setScale(1.8).refreshBody(); // (x, y, gameObject)
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0, end: 1, 
            }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 25, end: 31,
            }),
            frameRate: 10,
            repeat: -1  // loop
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 25, end: 31
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 40, end: 43
            }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 44, end: 44
            }),
            frameRate: 10, 
        })
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platforms);
    }

    update() {

        if(this.gameOver) {
            return;
        }

        // Add Socket
        if (this.game.socket.connected) {
        this.game.socket.emit("scene", {
            scene: 1,
            player: this.game.socket.id,
            x: this.player.x,
            y: this.player.y
        });
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);     
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);     
            this.player.anims.play('idle', true);
        } 

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450);
        }
    }
}