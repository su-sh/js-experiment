console.log('typing-tutor');

let thatGame;
class Game {
  constructor() {

    this.element = undefined;
    this.displayInputElement = undefined;
    this.scoreElement = undefined;

    this.gameStarted = undefined;
    this.score = undefined;

    this.wordList = ['kindle', 'apple', 'ball', 'cat', 'dog', 'elephant', 'fish', 'enigma', 'grape', 'heed', 'blunderbuss', 'podium', 'talisman'];
    this.keyboardInput = [];

    this.displayWords = [];

    this.gameInterval = undefined;

    this.newWordTimer = 0;

    this.init();
    thatGame = this;
    this.word = new Word(thatGame.getRandomWord());
    this.displayWords.push(this.word);
  }

  init() {
    console.log('init', this.element);
    this.initElements();

  }

  initElements() {
    this.element = document.getElementsByClassName('game-container')[0];
    this.displayInputElement = document.getElementById('inputDisplay');

    this.scoreElement = document.createElement('span');

    this.scoreElement.style.position = 'absolute';
    this.scoreElement.style.top = 10+ 'px';
    this.scoreElement.style.right = 10 + 'px';
    this.scoreElement.style.color = 'black';
    document.getElementById('game-container').appendChild(this.scoreElement);


    this.score = 0;
    this.gameStarted = false;


    console.log('init', this.element);


    // this.element.innerHTML='this'+this.score;
    // var x = t;
    // console.log(x)


    document.addEventListener('keydown', function (event) {
      var x = event.keyCode;
      if (event.keyCode == 8) {
        // backspace
        console.log('backSpace');
        if (thatGame.keyboardInput.length > 0) {
          thatGame.keyboardInput.pop();
          console.log('Backspace: ', thatGame.keyboardInput);



        }
      }

      if (event.keyCode > 64 && event.keyCode < 123) {
        var y = String.fromCharCode(x).toLowerCase();
        thatGame.keyboardInput.push(y);
        console.log('Input: ', thatGame.keyboardInput);
      }

      thatGame.checkIfInputMatched();
      thatGame.displayInput();
    });

    this.startGame();

  }

  startGame() {

    this.gameStarted = true;

    this.gameInterval = setInterval(this.mainGame, 1000 / 60);

  }

  mainGame() {

    if (thatGame.gameStarted) {

      thatGame.newWordTimer++;

      if (thatGame.newWordTimer == 80) {
        let word = new Word(thatGame.getRandomWord());
        thatGame.displayWords.push(word);
        thatGame.newWordTimer = 0;
      }


      // console.log('s')
      for (var i = 0; i < thatGame.displayWords.length; i++) {
        thatGame.displayWords[i].draw();

        thatGame.displayWords[i].move();
        thatGame.displayScore();

        // height
        if (thatGame.displayWords[i].getY() >= 500) {
          console.log('gameover');
        }
      }

    } else {

    }

  }

  displayInput() {
    thatGame.displayInputElement.innerHTML = thatGame.keyboardInput.join('');
  }

  displayScore() {
    thatGame.scoreElement.innerHTML = `SCORE: ${this.score}`;
  }
  getRandomWord() {
    var num = Math.floor(Math.random() * this.wordList.length);
    var ret = this.wordList[num];
    this.wordList.splice(num, 1);

    return ret;
  }

  checkIfInputMatched() {
    let inputLength = thatGame.keyboardInput.length;

    for (var i = 0; i < thatGame.displayWords.length; i++) {

      if (thatGame.displayWords[i].word.slice(0, inputLength) === thatGame.keyboardInput.join('')) {
        console.log('Match: ', thatGame.displayWords[i].word.slice(0, inputLength));

        var totalMatched = thatGame.displayWords[i].matchUpdate(inputLength);
        if (totalMatched) {
          console.log('something matched');
          thatGame.displayWords.splice(i, 1);
          thatGame.score++;

          thatGame.keyboardInput = [];
          thatGame.displayInput();
          console.log('Score: ', thatGame.score);
        }

      }
    }


  }

}


let thatWord;
class Word {
  constructor(word) {
    thatWord = this;
    this.word = word;
    this.delete = false;
    this.x = 0;
    this.y = -20;
    this.letters = [];
    this.lettersSpan = [];
    this.element = undefined;
    this.matched = false;
    this.init();
  }

  init() {
    this.element = document.createElement('span');
    this.letters = this.word.split('');

    for (var i = 0; i < this.letters.length; i++) {
      // console.log(this.letters[i]);
      var letterSpanEl = document.createElement('span');
      letterSpanEl.innerHTML = this.letters[i];
      this.element.appendChild(letterSpanEl);
      this.lettersSpan.push(letterSpanEl);
    }


  }

  draw() {
    this.element.style.position = 'absolute';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.color = 'black';
    document.getElementById('game-container').appendChild(this.element);
  }

  move() {
    this.y++;

    if (this.y > 150) {
      // document.getElementById('game-container').removeChild(this.element);

    }
    this.element.style.top = this.y + 'px';
  }

  getY() {
    return this.y;
  }


  matchUpdate(length) {
    for (var i = 0; i < length; i++) {
      this.lettersSpan[i].style.color = 'blue';
    }


    if (length == this.word.length) {

      console.log('no. ', this.word.length);

      // document.getElementById('game-container').removeChild(this.element);
      // container.removeChild(this.element);
      document.getElementById('game-container').removeChild(this.element);

      return true;
    } else {
      return false;
    }
  }
}





var game = new Game();