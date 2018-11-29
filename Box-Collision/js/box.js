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

    if ((this.x <= 0) || ((this.x + this.width >= parseInt(mainContainer.style.width, 10)))) {
      this.dirX = this.dirX * -1;
      console.log('collision x');
    }

    if ((this.y <= 0) || ((this.y + this.height >= parseInt(mainContainer.style.height, 10)))) {
      this.dirY = this.dirY * -1;
      console.log('collision y');
    }



    var box1, box2;
    for (var i = 0; i < boxArray.length; i++) {
      for (j = 0; j < boxArray.length; j++) {
        if (i != j) {
          // console.log(i,' ',j)

          box1 = boxArray[i];
          box2 = boxArray[j];
          if (box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.height + box1.y > box2.y) {
            // collision detected!
            console.log('collision Detected')


            console.log('box1: ', box1.dirX, 'box1Y;', box1.dirY);
            console.log('box2: ', box2.dirX, 'box2Y;', box2.dirY);

            // var tempX = box1.dirX;
            // var tempY = box1.dirY;

            box1.dirX *= -1;
            box1.dirY = -1;

            box2.dirX *= -1;
            box2.dirY *= -1;

            // box2.dirX *= -1;
            // box2.dirY *= -1;


            console.log('box1: ', box1.dirX, 'box1Y;', box1.dirY);
            console.log('box2: ', box2.dirX, 'box2Y;', box2.dirY);
            console.log('collision Ended')

          }

        }
      }
    }

  }


  // this.checkObjCollision = function () {
  //   var box1, box2;
  //   for (var i = 0; i < boxArray.length; i++) {
  //     for (j = 0; j < boxArray.length; j++) {
  //       if (i != j) {
  //         // console.log(i,' ',j)

  //         box1 = boxArray[i];
  //         box2 = boxArray[j];
  //         if (box1.x < rect2.x + rect2.width &&
  //           box1.x + box1.width > box2.x &&
  //           box1.y < box2.y + box2.height &&
  //           box1.height + box1.y > box2.y) {
  //           // collision detected!

  //           console.log('collision Detected')
  //         }

  //       }
  //     }
  //   }
  // }


}


function init() {

  var mainContainer = document.getElementById('main-container');
  mainContainer.style.width = '300px';
  mainContainer.style.height = '300px';
  mainContainer.style.backgroundColor = 'green';

  var boxNos = 10;

  for (var i = 0; i < boxNos; i++) {
    var box = new Box(generateRandomNumber(300), generateRandomNumber(300));
    box.create(mainContainer);
    boxArray.push(box);
  }


  var mainInterval = setInterval(function () {
    for (var i = 0; i < boxArray.length; i++) {
      boxArray[i].checkCollision(mainContainer);

      // boxArray[i].checkObjCollision();
      boxArray[i].update();
      boxArray[i].move();

    }
    // console.log(boxArray[1]);
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