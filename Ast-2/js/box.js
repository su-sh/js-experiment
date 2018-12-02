console.log('box.js');


var boxArray = [];
var colorArray = ['red', 'yellow', 'blue', 'white', 'black'];

function Box(x, y) {
  this.x = x;
  this.y = y;
  this.dirX = 1;
  this.dirY = 1;
  this.width = 10;
  this.height = 10;

  var c = (x + y) % 5;
  this.color = colorArray[c];
  this.element;

  this.create = function (parent) {
    this.element = document.createElement('div');

    this.element.style.width = this.width;
    this.element.style.height = this.height;
    this.element.style.position = 'absolute';
    this.element.style.backgroundColor = this.color;
    this.setPosition(this.x, this.y);
    parent.appendChild(this.element);
  }

  this.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  this.move = function () {
    this.x = this.x + this.dirX;
    this.y = this.y + this.dirY;
  }

  this.update = function () {
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  this.checkCollision = function (mainContainer) {

    console.log(mainContainer.style.height);

    if ((this.x < 0) || ((this.x + this.width > parseInt(mainContainer.style.width, 10)))) {
      this.dirX = this.dirX * -1;
      console.log('collision x');
    }

    if ((this.y < 0) || ((this.y + this.height > parseInt(mainContainer.style.height, 10)))) {
      this.dirY = this.dirY * -1;
      console.log('collision y');
    }
  }

  this.checkObjCollision = function () {
    var box1, box2;

    for (var i = 0; i < boxArray.length; i++) {
      for (var j = 0; j < boxArray.length; j++) {
        if (i != j) {
          box1 = boxArray[i];
          box2 = boxArray[j];
          if (box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x && box1.y < box2.y + box2.height &&
            box1.height + box1.y > box2.y) {
            box1.dirY *= 1;
            box2.dirY *= -1;
            box1.dirX *= -1;
            box2.dirX *= 1;
          }
        }
      }
    }
  }
}


function init() {

  var width = 200;
  var height = 200;
  var mainContainer = document.getElementById('main-container');
  mainContainer.style.width = width + 'px';
  mainContainer.style.height = height + 'px';
  mainContainer.style.backgroundColor = 'green';

  var boxNos = 10;

  for (var i = 0; i < boxNos; i++) {
    var box = new Box(generateRandomNumber(width - 20), generateRandomNumber(height - 20));
    box.create(mainContainer);
    boxArray.push(box);
  }


  var mainInterval = setInterval(function () {
    for (var i = 0; i < boxArray.length; i++) {

      boxArray[i].move();

      boxArray[i].update();

      boxArray[i].checkCollision(mainContainer);

      boxArray[i].checkObjCollision();


    }
   
  }, 1000 / 30);
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