function player(placement){
  this.margin  = 10,
  this.width   = 10,
  this.height  = 100,
  this.x       = 0,
  this.y       = (HEIGHT-this.height)/2,
  this.keyup   = 38,
  this.keydown = 40,

  this.update = function(){
    if(keyState[this.keyup]){this.y -= 14};
    if(keyState[this.keydown]){this.y += 14};

    this.y = Math.max(Math.min(this.y, HEIGHT-this.height),0);
  },

  this.draw = function(){
    this.x = (placement) ? WIDTH-this.margin-this.width : this.margin
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}
