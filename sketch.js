var PLAY = 1,END = 0;
var man,man_image,thundercloud,thundercloud_image,tornado,tornado_image,background_20,background_image,thunderCloudGroup,tornadoGroup,score,gameState = PLAY;

var player = "You";
localStorage["HighestScore"];
localStorage["Name"] = player;

function preload(){

 man_image = loadImage("photo.png");
 thundercloud_image = loadImage("thunder20.png");
 tornado_image = loadImage("tornado20.png");
 background_image = loadImage("back_image.jpg");
 
}


function setup() {
  createCanvas(600,600);
  
  background_20 = createSprite(400,250);
  background_20.addImage("moving image",background_image);
  background_20.scale = 3
  background_20.velocityX = -3;

  man = createSprite(150,400,10,10);
  man.addImage("main image",man_image);
  man.scale = 0.5;
  //man.debug = true;
  man.setCollider("rectangle",50,10,150,100)
  
  thunderCloudGroup =  new Group();
  tornadoGroup =  new Group();

  score = 0;
}

function draw() {
   background(0);  

  if(gameState === PLAY){
   score = score + Math.round(getFrameRate()/60);
  
    if (background_20.x<0 ){
        background_20.x = background_20.width/2;
      }

    if (keyDown("up_Arrow")){
      man.velocityY = -3;
    }

    if (keyWentUp("up_Arrow")){
      man.velocityY = 0;
    }

    if (keyDown("down_Arrow")){
      man.velocityY = 3;
    }

    if (keyWentUp("down_Arrow")){
      man.velocityY = 0;
    }

    if(thunderCloudGroup.isTouching(man)){
      gameState = END;
    }

    if (tornadoGroup.isTouching(man)){
      gameState = END;
    }
    Thunder();
    Tornado();
    drawSprites(); 
    
    stroke("white");
    textSize(20);
    fill("white")
    text("Score :"+ score, 50, 75)
    
  }   
    if(thunderCloudGroup.isTouching(man)){
      gameState = END;
    }
  
    if (tornadoGroup.isTouching(man)){
      gameState = END;
    }
  
    if(gameState ===END){
      stroke ( "white");
      textSize(20);
      fill ("white");
      text ("GameOver",300,300);
      text("Highest Score: " +localStorage["HighestScore"],100,50);
      text("Name: "+localStorage["Name"],300,50);

      if(localStorage["HighestScore"]<score){
        localStorage["HighestScore"] = score;
      }
    }
  
}

function Thunder(){
  if (frameCount % 40 === 0){ 
    thundercloud = createSprite(650,150,10,10);
    thundercloud.addImage("thundercloud image",thundercloud_image);
    thundercloud.scale = 0.2;
    thundercloud.y = Math.round(random(50,350));
    thundercloud.velocityX = -4
    //thundercloud.debug = true;
    thundercloud.setCollider("circle",0,0,170)
    thundercloud.lifetime = 150;
    thunderCloudGroup.add(thundercloud);
  }
}

function Tornado(){
  if (frameCount % 120 === 0){
    tornado = createSprite(650,450,10,10)
    tornado.addImage("image",tornado_image);
    tornado.velocityX = -4;
    tornado.scale = 1;
    tornado.lifetime = 170;
    //tornado.debug = true;
    tornado.setCollider("rectangle",0,0,100,120)
    tornadoGroup.add(tornado);
  }
}