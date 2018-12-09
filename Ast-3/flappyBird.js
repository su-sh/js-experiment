var cvs = document.getElementById('gameCanvas');
var ctx = cvs.getContext("2d");

let gameMessage = new Image();
gameMessage.src = './img/message.png';

let bg = new Image();
bg.src = "./img/background.png";

let keyPressed = false;

class Bird {
  constructor() {
    
    this.birdX = 25;
    this.birdY = 50;
  }
}

class Pipe {
  constructor(pipeTop, pipeBottom) {
    this.x = cvs.width;
    console.log(pipeTop.height)
    this.y = Math.floor(Math.random() * pipeTop) - (pipeTop);
    console.log('top ', pipeTop, ' pipeBottom ', pipeBottom, ' y', this.y);
    this.gap = 125;
    this.constant = pipeTop + this.gap;
  }

  difficulty(x) {
    if (x === 1) {
     
    }
  }

}

class Game {

  constructor() {

    this.score = 0;

    this.gravity = 2;

    this.isGameOver = false;

    this.bird = new Bird();
    this.pipeArray = [];

    this.birdImg = new Image();
    this.fg = new Image();
    this.pipeTop = new Image();
    this.pipeBottom = new Image();
    this.base = new Image();

    this.gameOverImg = new Image();

    this.base.src = './img/base.png';
    this.birdImg.src = "./img/redbird-midflap.png";
    this.pipeTop.src = './img/pipe-top.png';
    this.pipeBottom.src = './img/pipe-bottom.png';
    this.gameOverImg.src='./img/gameover.png';
    this.drawWaitingAnimation;

    // this.gameMessage = new Image();
    // this.gameMessage.src = './img/message.png';

    // this.bg = new Image();
    // this.bg.src = "./img/background.png";

    // this.gameStarted = false;
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

    this.drawWaitingPage();
  }

  draw() {

    if (!this.isGameOver) {

      ctx.drawImage(bg, 0, 0);

      this.drawBird();

      this.gravity = this.gravity + 0.2;

      this.bird.birdY += (this.gravity);

      for (var i = 0; i < this.pipeArray.length; i++) {
        // y + this.pipeArray[i].constant);

        this.drawPipe(this.pipeArray[i]);
        this.pipeArray[i].x--;

        if (this.pipeArray[i].x == 125) {
          this.pipeArray.push(new Pipe(this.pipeTop.height, this.pipeBottom.height));
        }

        // collision
        if ((this.bird.birdX + this.birdImg.width >= this.pipeArray[i].x && this.bird.birdX <= this.pipeArray[i].x + this.pipeBottom.width) &&
          (this.bird.birdY <= this.pipeArray[i].y + this.pipeTop.height || this.bird.birdY + this.birdImg.height >= this.pipeArray[i].y + this.pipeArray[i].constant)) {
          console.log('Game Over');
          this.drawGameOverPage();
        }

        // collision at canvas end
        if ((this.bird.birdY > cvs.height) || (this.bird.birdY < 0)) {
          console.log('Game Over');
          this.drawGameOverPage();
        }

        if ((this.bird.birdY >= cvs.height - this.base.height)) {
          console.log('Game Over base');

          this.drawGameOverPage();

        }

        // collision end
        ctx.drawImage(this.birdImg, this.bird.birdX, this.bird.birdY);
        if (this.pipeArray[i].x === 10) {
          this.score++;
          console.log('Score: ', this.score);
        }

      }

      this.drawBase();

      this.drawScore();

      if (keyPressed) {
        console.log('Key Pressed');
        this.gravity = -3;
        this.bird.birdY -= this.gravity;
        //this.bird.birdY += -35;
        keyPressed = false;

      }

      requestAnimationFrame(this.draw.bind(this));
    }
  }



  drawPipe(pipe) {
    ctx.drawImage(this.pipeTop, pipe.x, pipe.y);
    ctx.drawImage(this.pipeBottom, pipe.x, pipe.y + pipe.constant);
  }

  drawScore() {
    ctx.font = "20px Arial";
    ctx.fillText(`SCORE: ${this.score}`, 20, 480);
  }
  drawBird() {
    ctx.drawImage(this.birdImg, this.bird.birdX, this.bird.birdY);
  }

  drawBase() {
    ctx.drawImage(this.base, 0, cvs.height - this.base.height);
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



  drawGameOverPage() {
    this.isGameOver = true;
    // ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(bg,0,0);
    ctx.drawImage(this.gameOverImg, 50, 200);

    if (keyPressed) {
      console.log('GameOver')
      keyPressed = false;
    }

    this.startGame();

  }
}

document.addEventListener('click', this.moveup);

function moveup() {
  console.log('Key Pressed');
  keyPressed = true;
}

window.onload = function () {
  var game = new Game();
  game.startGame();
}