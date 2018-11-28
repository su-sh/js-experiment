console.log('box.js');

var boxArray = [];

function Box(x, y) {
  this.x = x;
  this.y = y;
  this.dirX = 1;
  this.dirY = 1;
  this.width = 10;
  this.height = 10;
  this.color = 'black';
  this.element;

  this.draw = function () {

  };

  this.create=function(parent){
    this.element = document.createElement('div');
    this.element.style.width = this.width;
    this.element.style.height = this.height;
    this.element.style.position = 'absolute';
    this.element.style.backgroundColor=this.color;
    this.setPosition(this.x,this.y);
    parent.appendChild(this.element);
  }
  
  this.setPosition=function(x,y){
    this.x = x;
    this.y = y;
    this.element.style.top= this.y+'px';
    this.element.style.left= this.x+'px';
  }

  this.move = function () {
    this.x = this.x + this.dirX;
    this.y = this.y + this.dirY;
    this.update();
  }

  this.update=function(){
    this.element.style.top= this.y+'px';
    this.element.style.left= this.x+'px';
  }

  

}









function init() {
  var mainContainer = document.getElementById('main-container');
  mainContainer.style.width = '600px';
  mainContainer.style.height = '600px';
  mainContainer.style.backgroundColor = 'green';

  var boxNos = 10;

  for (var i = 0; i < boxNos; i++) {
    var box = new Box(generateRandomNumber(500), generateRandomNumber(500));
    box.create(mainContainer);
    boxArray.push(box);
  }

  var mainInterval= setInterval(function(){
    
    for(var i=0;i<boxArray.length;i++){
      boxArray[i].move();
    }
    
    
    console.log(boxArray[1]);
  },1000/60);


}

init();













/**
 *
 * Utils
 *
 */

function generateRandomNumber(x) {
  return Math.floor((Math.random() * x) + 1);

}