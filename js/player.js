class Player {
  constructor(w, h, ctx, elapsed) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.x = 200;
    this.y = 200;
    this.active = true;
    this.keys = {
      LEFT_KEY: 37,
      RIGHT_KEY: 39,
      UP_KEY: 38,
      SPACE: 32
    },
      //sprites
      this.boy_off = new Image();
    this.boy_off.src = "./characters/boy/boy_off.png";
    this.boy_on = new Image();
    this.boy_on.src = "./characters/boy/boy.png";
    this.boy_shoots = new Image();
    this.boy_shoots.src = "./characters/boy/boy_shoots.png";
    this.boy_dies = new Image();
    this.boy_dies.src = "./characters/boy/boy_dies.png";

    // boy measures
    this.w = 43;
    this.h = 60;

    this.bullets = [];
    this.index = 14;
    this.indexdie = 0;
    
    this.speed = 9;
    this.sense = .023;
    this.gravity = 0;

    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.SPACE = false;
    this.controlKeys();

    this.time = {
      start: undefined,
      delta: undefined,
      deltaSeconds: undefined
    }
  }

  easeOut(speed) {
    Math.pow(--speed, 5) + 1;
  }

  draw(counter) {

    //sprite JET ON
    if (this.UP) {
      this.ctx.drawImage(this.boy_on, this.index, 0, 43, 60, this.x, this.y, this.w * 1.5, this.h * 1.5);
      if (this.index > 380) {
        this.index = 14;
      }
      else {
        this.index += 74.1;
      }
    }
    //sprite JET OFF
    if (!this.UP) {
      this.ctx.drawImage(this.boy_off, this.index, 0, 43, 60, this.x, this.y, this.w * 1.5, this.h * 1.5);
      if (this.index > 380) {
        this.index = 14;
      }
      else {
        this.index += 74.1;
      }
    }
    //sprite SHOOT
    if (this.SPACE) {
      this.ctx.drawImage(this.boy_shoots, this.index, 0, 55, 60, this.x, this.y, 55 * 1.5, this.h * 1.5);
      // if (this.index > 380) 
      // this.index = 14;
   
      if(Game.time.counter%2==0) this.index += 74.1;
      if(Game.time.counter%30==0) this.SPACE = false;

    }

    this.bullets = this.bullets.filter(bullet => {
      return bullet.x < this.canvasW;
    });
    this.bullets.forEach(function (bullet) {
      bullet.draw();
      bullet.move();
    });

  }
  die(counter) {

    this.ctx.drawImage(this.boy_dies, this.indexdie, 0, 50, 60, this.x, this.y, 50 * 1.5, this.h * 1.5);
    if (this.indexdie > 380) {
      this.indexdie = 380;
    }
    else if (counter % 15 == 0) {
      this.indexdie += 73.4;
    }
  }

  controlKeys() {
    document.onkeydown = function (e) {

      if (e.keyCode == this.keys.LEFT_KEY) this.LEFT = true;
      if (e.keyCode == this.keys.RIGHT_KEY) this.RIGHT = true;
      if (e.keyCode == this.keys.UP_KEY) this.UP = true;
      if (e.keyCode == this.keys.SPACE) {
        this.SPACE = true;
        this.shoot();
     
    
      }
    }.bind(this);
    document.onkeyup = function (e) {
      if (e.keyCode == this.keys.LEFT_KEY) this.LEFT = false;
      if (e.keyCode == this.keys.RIGHT_KEY) this.RIGHT = false;
      if (e.keyCode == this.keys.UP_KEY) this.UP = false;
    }.bind(this);
  }

  moveLeft () {
    if (this.x > 0) this.x -= this.speed; 
  }

  moveRight () {
    if (this.x+this.w*1.5 < Game.w) this.x += this.speed;
  }

  moveUp () {
    if (this.y >= 6) this.sense= -0.2;//this.y -= this.speed;
  }

  moveDown () {
    this.sense= 0.23;
  }

  move() {
   
    if(this.UP && this.y <= 6) {
      this.y=6; 
      this.gravity= 0;
    }
    else {
      this.gravity += this.sense;
      this.y += this.gravity;
      this.sense= 0.23;

      if (this.UP) {
        this.moveUp();
       }
    }
    
    if (this.LEFT) {
      this.moveLeft ();
    };

    if (this.RIGHT) {
      this.moveRight();
    }

  }

  shoot() {
    let bullet = new Bullet(
      this.x + this.w,
      this.y + (this.h / 2 - 5),
      this.h,
      this.w,
      this.ctx,
      this.elapsed
    );
    this.bullets.push(bullet);
  }

}

