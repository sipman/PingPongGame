function AIplayer(placement){
  this.margin  = 10,
  this.width   = 10,
  this.height  = 100,
  this.x       = 0,
  this.y       = (HEIGHT-this.height)/2,

  this.update = function(){
      var desty = theBall.y - (this.height - theBall.side) * 0.5;
      this.y += ((desty-this.y) % SPEED) / DIFF;
  },

  this.draw = function(){
    this.x = (placement) ? WIDTH-this.margin-this.width : this.margin
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}
