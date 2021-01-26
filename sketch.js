var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var playground, playgroundImage;
var invisibleGround;
var score;
var gameState;

function preload(){
 monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png",      "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana (1).png");
  obstacleImage = loadImage("stone.png");
  playgroundImage = loadImage("jungle.jpg");  
}

function setup(){
  createCanvas(600,600);

  playground = createSprite(300, 300, 600, 600);
  playground.velocityX = -2;
  playground.addImage("ground",playgroundImage);
  playground.x = playground.width / 2;
  
  invisibleGround = createSprite(400,450,800,10);
  invisibleGround.visible = false;

  monkey = createSprite(80, 420, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw(){  
  background(0);
  if (gameState === 1){ 
  
 if (playground.x < 100){
      playground.x = playground.width/2;
    }
  if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
     score = score+2;
     }
  if(keyDown("space") && monkey.y >= 320){
     monkey.velocityY = -12;
     }
  monkey.velocityY = monkey.velocityY + 1;
  
  monkey.collide(invisibleGround);

  switch(score){
    case 20: monkey.scale = 0.12;
      break;
    case 40: monkey.scale = 0.14;
      break;
    case 60: monkey.scale = 0.16;
      break;
    case 80: monkey.scale = 0.18; 
      break;
    case 100: monkey.scale = 0.20; 
      break; 
    case 120: monkey.scale = 0.22; 
      break;  
    case 140: monkey.scale = 0.24; 
      break;  
    default: break;  
         }
  spawnObstacles();
  spawnFruits();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : "+score, 500, 50);
 }
    if (gameState === 2){
  stroke("white");
  textSize(20);
  fill("white");
  text("GAME OVER", 300, 300);
 }
    if(obstacleGroup.isTouching(monkey)){
      gameState === 2
      }
      drawSprites();
    }

function spawnObstacles(){
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,480,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.setLifetime = -1;
    obstacle.velocityX = -3;
    obstacle.collide(invisibleGround); 
    obstacleGroup.add(obstacle);
  }
}

function spawnFruits(){
  if(frameCount % 120 === 0){
   var banana = createSprite(400,120,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(100,150));
    banana.velocityX = -8;
    banana.setLifetime = -1
    bananaGroup.add(banana);
    
  }
}