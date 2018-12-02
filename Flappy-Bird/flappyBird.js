var cvs = document.getElementById('gameCanvas');
var ctx = cvs.getContext("2d");




// var birdX = 10;
// var birdY = 150;
var gravity = 2;
var score = 0;








let keyPressed = false;


class Bird {
  constructor() {
    // this.image = new Image();
    // this.image.src = './img/redbird-midflap.png';
    this.birdX = 25;
    this.birdY = 50;
  }

}


class Pipe {
  constructor(pipeTop, pipeBottom) {
    // this.topImage = new Image();
    // this.topImage.src = './img/pipe-top.png';
    // this.bottomImage = new Image();
    // this.bottomImage.src = './img/pipe-bottom.png';
    this.x = cvs.width;
    this.y = Math.floor(Math.random() * pipeTop) - pipeBottom;

    console.log('top ', pipeTop, ' pipeBottom ', pipeBottom);
    this.gap = 125;
    this.constant = pipeTop + this.gap;
  }

}

class Game {
  constructor() {

    this.score = 0;

    this.bird = new Bird();
    this.pipeArray = [];

    this.birdImg = new Image();
    this.bg = new Image();
    this.fg = new Image();
    this.pipeTop = new Image();
    this.pipeBottom = new Image();


    this.birdImg.src = "./img/redbird-midflap.png";
    this.bg.src = "./img/background.png";
    this.pipeTop.src = './img/pipe-top.png';
    this.pipeBottom.src = './img/pipe-bottom.png';

  }

  init() {
    var pipe = new Pipe(320, 320);
    this.pipeArray.push(pipe);
    console.log('x: ', this.pipeArray[0].x, ', y:', this.pipeArray[0].y);
    this.draw();
  }

  draw() {
    ctx.drawImage(this.bg, 0, 0);
    ctx.drawImage(this.birdImg, this.bird.birdX, this.bird.birdY);
    this.bird.birdY++;
    // console.log('pipe ',this.pipeArray[0]);

    for (var i = 0; i < this.pipeArray.length; i++) {


      ctx.drawImage(this.pipeTop, this.pipeArray[i].x, this.pipeArray[i].y);

      ctx.drawImage(this.pipeBottom, this.pipeArray[i].x, this.pipeArray[i].y + this.pipeArray[i].constant);

      this.pipeArray[i].x--;


      if (this.pipeArray[i].x == 125) {
        this.pipeArray.push(new Pipe(this.pipeTop.height, this.pipeBottom.height));
        // console.log('top ', this.pipeTop.height, ' botto,', this.pipeBottom.height)
      }

      // collision
      if ((this.bird.birdX + this.birdImg.width >= this.pipeArray[i].x && this.bird.birdX <= this.pipeArray[i].x + this.pipeBottom.width) &&
        (this.bird.birdY <= this.pipeArray[i].y + this.pipeTop.height || this.bird.birdY + this.birdImg.height >= this.pipeArray[i].y + this.pipeArray[i].constant)) {
        console.log('Game Over');
        location.reload();
      }

      if ((this.bird.birdY > cvs.height) || (this.bird.birdY < 0)) {
        location.reload();

      }


      // collision end
      ctx.drawImage(this.birdImg, this.bird.birdX, this.bird.birdY);



      if (this.pipeArray[i].x === 10) {
        this.score++;
        console.log('Score: ', this.score);
      }



    }


    if (keyPressed) {
      console.log('Key Pressed');
      this.bird.birdY -= 25;
      keyPressed = false;
    }


    requestAnimationFrame(this.draw.bind(this));
  }




}




document.addEventListener('keydown', this.moveup);

function moveup() {
  console.log('happy');
  // console.log(this.bird.birdY);
  keyPressed = true;
}
window.onload = function () {
  var g = new Game();
  g.init();

  // draw();
}