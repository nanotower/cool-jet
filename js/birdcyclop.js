class BirdCyclop {
  constructor(x, y, w, h, ctx) {
    this.name = "birdCyclop";
    this.x = x;
    this.y = y;
    this.w = w;//estas dos se pueden borrar
    this.h = h;
    this.birdW = 39;
    this.birdH = 35;
    this.ctx = ctx;
    this.birdCyclop = new Image();
    this.birdCyclop.src = "./characters/enemies/bird-cyclop.png";
    this.index=6;
    this.t = 0;
    this.active=true
  }
  randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  draw (counter) {
    this.ctx.drawImage(this.birdCyclop,this.index,0,this.birdW,this.birdH,this.x,this.y,this.birdW,this.birdH);
      if (this.index>370) {
        this.index=6;
      }
      if(counter%3==0) {
        this.index+=53;
      }
  };

  move() {
    this.x--;
    // this.y = this.y + (Math.cos(this.t*(2*Math.PI))*this.randomInt(0.2,30));
    // this.t += 0.01    
  };

}
