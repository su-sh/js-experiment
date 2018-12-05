var cvs = document.getElementById('gameCanvas');
var ctx = cvs.getContext("2d");





let gameMessage = new Image();
gameMessage.src = './img/message.png';

let bg = new Image();
bg.src = "./img/background.png";


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

    this.gravity = 2;

    this.bird = new Bird();
    this.pipeArray = [];

    this.birdImg = new Image();
    this.fg = new Image();
    this.pipeTop = new Image();
    this.pipeBottom = new Image();
    this.base = new Image();

    this.base.src = './img/base.png';
    this.birdImg.src = "./img/redbird-midflap.png";
    this.pipeTop.src = './img/pipe-top.png';
    this.pipeBottom.src = './img/pipe-bottom.png';
    this.drawWaitingAnimation;


    // this.gameMessage = new Image();
    // this.gameMessage.src = './img/message.png';


    // this.bg = new Image();
    // this.bg.src = "./img/background.png";


    this.gameStarted = false;
  }

  loadImages() {

  }


  init() {
    console.log('startGame');
    ctx.drawImage(this.gameMessage, 0, 0);
  }

  startGame() {
    var pipe = new Pipe(320, 320);
    this.pipeArray.push(pipe);
    console.log('x: ', this.pipeArray[0].x, ', y:', this.pipeArray[0].y);
    ctx.drawImage(bg, 0, 0);

    // ctx.drawImage(this.bg, 0, 0);
    // this.draw();
    this.drawWaitingPage();
  }



  draw() {
    ctx.drawImage(bg, 0, 0);

    this.drawBird();
    this.bird.birdY+=this.gravity;

    for (var i = 0; i < this.pipeArray.length; i++) {
      // ctx.drawImage(this.pipeTop, this.pipeArray[i].x, this.pipeArray[i].y);
      // ctx.drawImage(this.pipeBottom, this.pipeArray[i].x, this.pipeArray[i].y + this.pipeArray[i].constant);

      this.drawPipe(this.pipeArray[i]);
      this.pipeArray[i].x--;

      if (this.pipeArray[i].x == 125) {
        this.pipeArray.push(new Pipe(this.pipeTop.height, this.pipeBottom.height));
      }

      // collision
      if ((this.bird.birdX + this.birdImg.width >= this.pipeArray[i].x && this.bird.birdX <= this.pipeArray[i].x + this.pipeBottom.width) &&
        (this.bird.birdY <= this.pipeArray[i].y + this.pipeTop.height || this.bird.birdY + this.birdImg.height >= this.pipeArray[i].y + this.pipeArray[i].constant)) {
        console.log('Game Over');
        location.reload();
      }

     

      // collision at canvas end
      if ((this.bird.birdY > cvs.height) || (this.bird.birdY < 0)) {
        console.log('Game Over');
        location.reload();
      }

      if ((this.bird.birdY >= cvs.height - this.base.height) ) {
        console.log('Game Over');
        location.reload();
      }

      

      // collision end
      ctx.drawImage(this.birdImg, this.bird.birdX, this.bird.birdY);

      if (this.pipeArray[i].x === 10) {
        this.score++;
        console.log('Score: ', this.score);
      }
    }

    this.drawBase();

    if (keyPressed) {
      console.log('Key Pressed');
      this.bird.birdY -= 25;
      keyPressed = false;
    }



    requestAnimationFrame(this.draw.bind(this));
  }

  drawBird() {
    ctx.drawImage(this.birdImg, this.bird.birdX, this.bird.birdY);
  }


  drawBase() {
    ctx.drawImage(this.base, 0, cvs.height - this.base.height);
  }

  drawPipe(pipe) {
    ctx.drawImage(this.pipeTop, pipe.x, pipe.y);
    ctx.drawImage(this.pipeBottom, pipe.x, pipe.y + pipe.constant);
  }


  drawWaitingPage() {
    var that = this;
    var timeleft = 3;
    var gameTimer = setInterval(function () {
      --timeleft;
      console.log(timeleft);

      ctx.drawImage(bg, 0, 0);
      // ctx.drawImage(this.bg, 0, 0);
      ctx.drawImage(gameMessage, 45, 80);

      ctx.font = "30px Arial";
      ctx.fillText(timeleft, 130, 410);

      if (timeleft <= 0) {
        that.draw();
        clearInterval(gameTimer);
      }
    }, 1000);
  }
}




document.addEventListener('click', this.moveup);

function moveup() {
  console.log('Key Pressed');
  keyPressed = true;
}



window.onload = function () {
  var g = new Game();
  g.startGame();

  // draw();
}