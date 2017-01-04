function scoreboard(){
  this.score = {
                ai: 0,
                player: 0
               },
  this.y = 40,
  this.updateScore = function(player){
    if(player!=player1){
      this.score.player++;
    }else{
      this.score.ai++;
    }
  },
  this.draw = function(){
    ctx.font = "20px Arial";

    ctx.fillText(this.score.ai,(WIDTH/2)-4+player2.width+player2.margin,this.y);
    ctx.fillText(this.score.player,(WIDTH/2)-player1.width-player1.margin-4,this.y);
  }
}
