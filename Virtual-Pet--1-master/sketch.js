//Create variables here
var database
var dog,happyDog;
var foodS,foodStock;
var feedTime,addFood;
var fedTime,lastFed;
var foodObj;

function preload(){
  //load images here
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

 
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  foodObj = new Food();

 dog = createSprite(250,250,50,50);
dog.addImage(sadDog);
dog.scale = 0.1;
foodStock = database.ref('food');
foodStock.on("value",readStock);

feed = createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood = createButton("Add food");
addFood.position(800,95);
addFood.mousePressed(addFood);
}


function draw() {  
  background(46,139,87);
  
  drawSprites();
  //add styles here
  fill("red");
  textSize(15);
  text("FoodStockLeft:"+foodS,200,200);

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);

  if(lastFed = 12){
    text("last fed :"  + lastFed %12 + "PM",350,30);
  }else if(lastFed == 0){
    text("last fed : 12 AM",350,30);
  }else{
    text("last fed :"+ lastFed + "AM",350,30)
  }

  foodObj.display();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
database.ref('/').update({
  food:x
})
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  });
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}