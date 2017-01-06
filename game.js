let   WIDTH     = 700,
      HEIGHT    = 600,
      SPEED     = 14,
      DIFF      = 2,
      paused    = false,
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
    pauseListener(e);
    delete keyState[e.keyCode];
  });

  pause();

  theBall.serve(1);
  loop = function(){
      update();
      draw();
      window.requestAnimationFrame(loop, canvas);
  };
  window.requestAnimationFrame(loop, canvas);
  draw();
}

function createMenu(options){
  let menu = document.createElement("div");
  let list = document.createElement("ul");

  let setDifficulty = function(Difficulty){
    DIFF = Difficulty;
    console.log(DIFF);
    pause();
  };
  options = options || {
    "Play":function(){pause()},
    "Difficulty":{
      "Easy"   : function(){setDifficulty(3)},
      "Medium" : function(){setDifficulty(2)},
      "Hard"   : function(){setDifficulty(1)},
    },
    "About": "Cretated by </br><b>Morten Hartvigsen</b>"
  };

  menu.id = "menu";

  for (var i = 0; i < Object.keys(options).length; i++) {
    let key      = Object.keys(options)[i];
    let value    = options[key];
    let tempItem = document.createElement("li");
    let type     = typeof(options[Object.keys(options)[i]]);

    tempItem.innerHTML = key;
    
    if(type == "function"){
      tempItem.addEventListener("click",value);
    }else if(type == "object"){
      tempItem.addEventListener("click",function(){
        document.getElementById("menu").outerHTML = "";
        document.body.appendChild(createMenu(value));
      });
    }else if(type == "string"){
      tempItem.addEventListener("click",function(){
        let newObj = {};

        newObj[value] = undefined;
        newObj["Close"] = function(){pause()};

        document.getElementById("menu").outerHTML = "";
        document.body.appendChild(createMenu(newObj));
      });
    }


    list.appendChild(tempItem);
  }

  menu.appendChild(list);

  return menu;
}

function pause(isPaused){
  if(isPaused == undefined){
    paused = !paused;
  }else{
    paused = isPaused;
  }

  if(paused){
    document.body.appendChild(createMenu());
    canvas.style.webkitFilter = "blur(3px)";
  }else{
    document.getElementById("menu").outerHTML = "";
    canvas.style.webkitFilter = "blur(0px)";
  }
}

function pauseListener(e){
  if(e.keyCode == 27){
    pause();
  }
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
  if(!paused){
    theBall.update(theScoreboard);
    player1.update();
    player2.update();
  }else{

  }
}

main();
