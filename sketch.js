var gameState = 1;
var PLAY = 1;
var END = 0;

var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var gameOver,gameOverImg;



function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png")
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(400, 400);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);

  
  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

gameOver = createSprite(190,150,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;
  
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);
  
   
      edges = createEdgeSprites();
  boy.collide(edges);

 

   if(gameState === PLAY){
    boy.x = World.mouseX;
     
    if (path.y > 400) {
    path.y = height / 2;
  }

     gameOver.visible=0;
     
     path.velocityY = 4;
     
     createCash();
  createDiamonds();
  createJwellery();
  createSword();
     
     if(swordGroup.isTouching(boy)){
       swordGroup.destroyEach();
       gameState = END;
     }
     //these will be done only in play state... so keep here in this condition
     if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection = treasureCollection + 20
  } else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection = treasureCollection + 200

  } else if (jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection = treasureCollection + 100

  } 
     //don't repeat same if condition... put it once
//   else 
//     if (swordGroup.isTouching(boy)) {
//       swordGroup.destroyEach();
//     }
     
   }else if(gameState===END){
     path.velocityY = 0;
     boy.destroy();
     cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
     gameOver.visible=true;
   }
  
  
  boy.setCollider("circle", 0, 0, 600)
  //   boy.debug = true;


  //code to reset the background
 

  

  
  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 100 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 4;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 120 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 4;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 180 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 4;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 300 == 0) {
    var sword = createSprite(Math.round(random(30, 370), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 4;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}