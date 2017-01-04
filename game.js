let   WIDTH     = 700,
      HEIGHT    = 600,
      canvas,
      ctx,
      keyState  = {};

let   player1 = new player(0),
      player2 = new AIplayer(1),
      theBall = new ball();
      theScoreboard = new scoreboard();

function main(){
  canvas        = document.createElement("canvas");
  canvas.width  = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  document.addEventListener("keydown", function(e){
    keyState[e.keyCode] = true;
  });
  document.addEventListener("keyup", function(e){
    delete keyState[e.keyCode];
  });
  theBall.serve(1);
  loop = function(){
    update();
    draw();
    window.requestAnimationFrame(loop, canvas);
  };
  window.requestAnimationFrame(loop, canvas);
  draw();
}

function draw(){
  ctx.fillRect(0,0, WIDTH, HEIGHT);
  ctx.save();
  ctx.fillStyle="#fff";

  let w    = 4,
      x    = (WIDTH-w)*0.5,
      y    = 0,
      step = HEIGHT/20;
  while(y < HEIGHT){
    ctx.fillRect(x, (y+step*0.25), w, (step*0.5));
    y += step;

  }
  ctx.beginPath();
    ctx.setLineDash([(step*0.5), 15]);
    ctx.lineWidth = w;
    ctx.fillStyle = '#000';
    ctx.arc(WIDTH/2,HEIGHT/2,100,0,2*Math.PI);
    ctx.strokeStyle = '#fff';
    ctx.fill();
    ctx.stroke();
  ctx.closePath();
   ctx.fillStyle="#fff";
  player1.draw();
  player2.draw();
  theBall.draw();
  theScoreboard.draw();
  ctx.restore();
}

function update(){
  theBall.update(theScoreboard);
  player1.update();
  player2.update();
}

main();
