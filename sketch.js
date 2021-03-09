var balloon;
var bgImg;
var balloonAnm,balloonAnm2;
var database;

function preload() {

  bgImg=loadImage("backgroundImage.png")
  balloonAnm = loadAnimation("Hot_Air_Ballon-02.png", "Hot_Air_Ballon-03.png", "Hot_Air_Ballon-04.png")
  balloonAnm2 = loadAnimation("Hot_Air_Ballon-02.png","Hot_Air_Ballon-04.png")

}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon=createSprite(190, 416, 50, 50);
  balloon.addAnimation("balloon",balloonAnm)
  balloon.scale=0.2;

  var balloonPosition = database.ref('Balloon/Position')
  balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(bgImg);  

  
  //console.log(balloon.x)
  //console.log(balloon.y)

  if(keyDown(LEFT_ARROW)){
    writePosition(-4,0)
    balloon.addAnimation("ballon",balloonAnm2)
   
  }

  if(keyDown(RIGHT_ARROW)){
    writePosition(5,0)
    
  }

  

  if(keyDown(UP_ARROW)){
    writePosition(0,-1)
    
  }

  if(keyDown(DOWN_ARROW)){
    writePosition(0,5)
   
  }


  drawSprites();

  fill(0,5,0)
  text("Use the Arrow Keys to Move the Balloon",50,50)

}

function writePosition(x,y){
  database.ref('Balloon/Position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}