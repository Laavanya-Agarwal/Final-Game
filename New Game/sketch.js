var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl,girl_running,girl_dead;
var ground,groundImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var gameOverImg,restartImg;
var invisibleBlock1,invisibleBlock2;
var coin,coin1,coin2,coinImg;
var coin_score = 0
var coin_collect;
var player_dead;
var resume_button;

function preload(){
  girl_running = loadAnimation("Images/R1.png","Images/R2.png","Images/R3.png","Images/R4.png");
  girl_collided = loadAnimation("Images/Dead.png");
  groundImage = loadImage("Images/ground.png");
  restartImg = loadImage("Images/Restart.png");
  gameOverImg = loadImage("Images/GameOver.png");
  obstacle1 = loadImage("Images/1.png");
  obstacle2 = loadImage("Images/2.png");
  obstacle3 = loadImage("Images/3.png");
  obstacle4 = loadImage("Images/4.png");
  coinImg = loadImage("Images/coin.png");
  coin_collect = loadSound("Sounds/CoinCollect.wav");
  player_dead = loadSound("Sounds/playerDead.wav");
}

function setup() {
  createCanvas(1000,300);

  ground = createSprite(500,100,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  girl = createSprite(100,160,20,50);
  girl.addAnimation("running", girl_running);
  girl.addAnimation("dead", girl_collided);
  girl.scale = 0.2;
  
  gameOver = createSprite(500,120);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(500,200);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
  invisibleBlock1 = createSprite(200,30,400,10);
  invisibleBlock1.visible = false;
  invisibleBlock2 = createSprite(200,290,400,10);
  invisibleBlock2.visible = false;
  
  obstaclesGroup = createGroup();
  coinGroup = createGroup();
  
  girl.setCollider("rectangle",0,0,300,500);

  resume_button
}

function draw() {
  
  background(180);

  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -4;
    
    if (ground.x < 450){
      ground.x = ground.width/2;
    }
    
    //spawn obstacles on the ground
    spawnObstacles();

    //spawn coins to collect
    spawnCoins();

  
    for (var i=0;i<obstaclesGroup.length;i++){
      if(obstaclesGroup.get(i).isTouching(girl)){
        gameState = END;
        player_dead.play()
         
          }
      }

    for (var i=0;i<coinGroup.length;i++){
      if(coinGroup.get(i).isTouching(girl)){
          coin_collect.play();
          coinGroup.get(i).destroy();
          coin_score = coin_score + 100;
          }
      }

    if(keyDown(UP_ARROW)){
      girl.y = girl.y - 10
    }

    if(keyDown(DOWN_ARROW)){
      girl.y = girl.y + 10
    }

  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the girl animation
      girl.changeAnimation("dead", girl_collided);
      ground.velocityX = 0;
      girl.velocityY = 0
      
  //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0); 
    obstaclesGroup.destroyEach();

    coinGroup.setLifetimeEach(-1);
    coinGroup.setVelocityXEach(0);  
    coinGroup.destroyEach();
   }

  //stop girl from going out of the road
  girl.collide(invisibleBlock1);
  girl.collide(invisibleBlock2);
  girl.debug = false
  
  //mousePressedOver(sprite name)
  if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();

  textSize(25);
  textAlign(CENTER);
  fill("black");
  text("Score: "+coin_score,900,30);
}

function reset() {
  //reset button clicked, switch to game state play
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  //to destroy group : groupname.destroyEach();
  obstaclesGroup.destroyEach();
  
  //to get trex animation back to normal
  girl.changeAnimation("running", girl_running);
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,Math.round(random(100,250)),10,40);
   obstacle.velocityX = -(4+frameCount/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
  
    //assign scale and lifetime to the obstacle + add them to the group       
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}

function spawnCoins(){
  if (frameCount % 60 === 0){

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: coin = createSprite(600,Math.round(random(50,150)));
              coin.addImage(coinImg);
              coin.velocityX = -3
              coin.scale = 0.1;
              coin.lifetime = 300;
              coinGroup.add(coin);
              break;
      case 2: coin = createSprite(600,Math.round(random(50,150)));
              coin1 = createSprite(615,50);
              coin.addImage(coinImg);
              coin1.addImage(coinImg);
              coin.velocityX = -3
              coin1.velocityX = -3
              coin.scale = 0.1;
              coin1.scale = 0.1;
              coin.lifetime = 300;
              coin1.lifetime = 300;
              coinGroup.add(coin);
              coinGroup.add(coin1);
              break;
      case 3: coin = createSprite(600,Math.round(random(50,150)));
              coin1 = createSprite(615,50);
              coin2 = createSprite(630,50);
              coin.addImage(coinImg);
              coin1.addImage(coinImg);
              coin2.addImage(coinImg);
              coin.velocityX = -3
              coin1.velocityX = -3
              coin2.velocityX = -3
              coin.scale = 0.1;
              coin1.scale = 0.1;
              coin2.scale = 0.1;
              coin.lifetime = 300;
              coin1.lifetime = 300;
              coin2.lifetime = 300;
              coinGroup.add(coin);
              coinGroup.add(coin1);
              coinGroup.add(coin2);
              break;
      default: break;
    }
  }
}