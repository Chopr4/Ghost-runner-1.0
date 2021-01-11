var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var spookySound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){

  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.setVelocityY = 5;
  
  spookySound.loop();
  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImage);
  
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(0);
  
  if (gameState === PLAY) {
    
  if (keyDown("space")) {
      
      ghost.velocityY = -5;
      
    }
    
  if (keyDown("left_arrow")) {
    
      ghost.x = ghost.x -3;
  } 
  
  if (keyDown("right_arrow")) {
    
      ghost.x = ghost.x +3;
  } 
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if (tower.y >400){
      
        tower.y = 300;
}
    
  spawnDoors();
    
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY = 0;
}
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy();
    gameState = END;
}    
    
    
    
  drawSprites();    
  }
 
  if (gameState === END){
    
    stroke("yellow");
    fill("yellow");
    textSize(35);
    text("Gameover", 230, 250);
    
    
  }
 
  
}

function spawnDoors() {
  
  if (frameCount % 240 === 0) {
    
   var door = createSprite(200, -50);
   var climber = createSprite(200, 10);
   var invisibleBlock = createSprite(200, 15);
    
  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleBlock.velocityY = 1;
    
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
 
  door.x = Math.round(random(100,400));
  climber.x = door.x;
    invisibleBlock.x = door.x;
    
    
    
  door.addImage(doorImage);
  climber.addImage(climberImage);
  
  //adjust the depth
  ghost.depth = door.depth;
  ghost.depth = ghost.depth +1;
    
  //assign lifetime to the variable
  ghost.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;
    
  //add each cloud to the group
  climberGroup.add(climber);
  doorsGroup.add(door);
  invisibleBlock.debug = true;
  invisibleBlockGroup.add(invisibleBlock);
}
  
}


