const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine, world;

var ground, backgroundImg;
var tower, towerImg;
var cannon;
var angle;
var balls = [];
var boats=[];

function preload() {
  
  backgroundImg = loadImage("/assets/background.gif");
  towerImg = loadImage("/assets/tower.png");
}

function setup() {

  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 20;

  var options = {
    isStatic: true
  };

  ground = Bodies.rectangle(0, height -1, 1200,2, options);
  World.add(world, ground);

  tower = Bodies.rectangle(150,350,160,310,options);
  World.add(world,tower);

  cannon = new Cannon(170, 110, 130, 100, angle);

  //boat = new Boat(width-80, height-60, 170,170,-80);
}

function draw() {
  image(backgroundImg, 0,0,1200,600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, 1200,2);
  
  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160,310);
  pop();

  cannon.display();
 

  for (var i=0; i < balls.length; i++){
    showCannonBalls(balls[i], i)
  }

  showBoats();
}  

function showCannonBalls(ball, i){
  if (ball){
    ball.display();
  }
}

function keyReleased(){

  if (keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }

}

function keyPressed(){

  if (keyCode === DOWN_ARROW){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }

}

function showBoats(){

  if (boats.length > 0){

    if (boats[boats.length -1] === undefined ||
        boats[boats.length -1].body.position.x < width -300){
      
        var positions = [-40, -60, -70, -20];
        var position = random(positions);

        var boat = new Boat(width, height -60, 170,170,position);
        boats.push(boat);

    } 

    for (var i=0; i < boats.length; i++){

      if (boats[i]){

        Body.setVelocity(boats[i].body, {x:-0.9, y:0}); 
        boats[i].display();

      }

    }

  }else {

    var boat = new Boat(width, height -60, 170,170, -60);
    boats.push(boat);

  }

}

