//Create variables here 
var  dog, happyDog;

var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

    
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  //add styles here
  stroke("black");
   textSize(15);
   fill(255, 255, 254)
  text("Food Remaining:" + foodS, 170,200);
  textSize(15);
  text("Press up arrow key to feed drago milk.", 130, 10, 300, 20)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}

