function ball(){
  this.x      = WIDTH/2,
  this.y      = HEIGHT/2,
  this.vel    = {
                    x: null,
                    y: null,
                },
  this.side   = 15,
  this.speed  = 20,

  this.serve = function(side){
    let r = Math.random();
    this.x = (side===1) ? player1.x+player1.width : player2.x-this.side;
    this.y = (HEIGHT - this.side)*r;
    let phi = 0.1*Math.PI*(1-2*r);
    this.vel.x = side*this.speed*Math.cos(phi);
    this.vel.y = this.speed*Math.sin(phi);
  },
  this.intersects = function(pdle, ball){
    return pdle.x < ball.x+ball.side && pdle.y < ball.y+ball.side && ball.x < pdle.x+pdle.width && ball.y < pdle.y+pdle.height;
  },
  this.update = function(scoreboard){
    this.x += this.vel.x;
    this.y += this.vel.y;
    if(0 > this.y || this.y+this.side > HEIGHT){
      let offset = (this.vel.y < 0) ? -this.y : HEIGHT - (this.y+this.side);
      this.y += 2*offset;
      this.vel.y *= -1;
    }
    let pdle = this.vel.x < 0 ? player1 : player2;
    if(this.intersects(pdle, this)){
      this.x = (pdle === player1) ? player1.x+player1.width : player2.x-this.side;
      let n = (this.y+this.side-pdle.y)/(pdle.height+this.side),
          smash = Math.abs(0.25*Math.PI*(2*n-1)) > 0.2*Math.PI ? 1.5 : 1;
      this.vel.x = smash*(pdle===player1 ? 1 : -1)*this.speed*Math.cos(0.25*Math.PI*(2*n-1));
      this.vel.y = smash*this.speed*Math.sin(0.25*Math.PI*(2*n-1));
    }
    if(0>this.x+this.side || this.x > WIDTH){
        scoreboard.updateScore(pdle);
        this.serve(pdle===player1 ? 1 : -1);
      }
  }

  this.draw = function(){
    ctx.fillRect(this.x, this.y, this.side, this.side);
  }
}
