console.log('typing-tutor');

let thatGame;
class Game {
  constructor() {

    this.element = undefined;
    this.displayInputElement = undefined;
    this.scoreElement = undefined;

    this.gameOverElement = undefined;
    this.gameWinnerElement = undefined;

    this.gameStarted = undefined;
    this.score = undefined;
    this.newWordTimer = undefined;

    this.wordList = ['hippie', 'hippies', 'hippisowski', 'lewandowski', 'blaszczykowski', 'sallow', 'placid', 'sage', 'candid', 'ignominy', 'pragmatic', 'transcribe', 'alacrity', 'cardinal', 'kindle', 'deliberate', 'augury', 'stipulate', 'mettlesome', 'touting', 'enigma', 'virtuosity', 'quintessential', 'blunderbuss', 'podium', 'talisman', 'idyll', 'aphoristic', 'maudlin', 'dispatch', 'froward', 'agile', 'bliss', 'champ', 'destiny', 'elegance', 'freedom', 'genius', 'hope', 'imagine', 'joy', 'kind', 'life', 'magic', 'noble', 'one', 'positive', 'quiet', 'refined', 'secure', 'tranquil', 'uplift', 'victory', 'win', 'xenium', 'yes', 'zeal'];
    // this.wordList = ['hippie'];
    this.keyboardInput = [];

    this.displayWords = [];
    this.matchedArrayList = [];

    this.gameInterval = undefined;

    this.newWordTimer = undefined;
    this.lastWord = false;

    this.init();
    thatGame = this;
    this.word = new Word(thatGame.getRandomWord());
    this.displayWords.push(this.word);
  }

  init() {
    this.initElements();

  }

  initElements() {
    this.element = document.getElementsByClassName('game-container')[0];
    this.displayInputElement = document.getElementById('inputDisplay');

    this.scoreElement = document.createElement('span');

    this.scoreElement.style.position = 'absolute';
    this.scoreElement.style.top = 10 + 'px';
    this.scoreElement.style.right = 10 + 'px';
    this.scoreElement.style.color = 'black';

    document.getElementById('game-container').appendChild(this.scoreElement);

    this.gameOverElement = document.createElement('span');
    this.gameOverElement.style.position = 'absolute';
    this.gameOverElement.style.top = 220 + 'px';
    this.gameOverElement.style.left = 38 + '%';
    this.gameOverElement.style.fontSize = '40px';
    this.gameOverElement.style.color = 'black';
    this.gameOverElement.innerHTML = 'GAME OVER';
    this.gameOverElement.style.display = 'none';

    this.gameWinnerElement = document.createElement('span');
    this.gameWinnerElement.style.position = 'absolute';
    this.gameWinnerElement.style.top = 220 + 'px';
    this.gameWinnerElement.style.left = 40 + '%';
    this.gameWinnerElement.style.fontSize = '40px';
    this.gameWinnerElement.style.color = 'black';
    this.gameWinnerElement.innerHTML = 'WINNER';
    this.gameWinnerElement.style.display = 'none';

    document.getElementById('game-container').appendChild(this.gameOverElement);

    document.getElementById('game-container').appendChild(this.gameWinnerElement);
    this.score = 0;
    this.newWordTimer = 0;
    this.gameStarted = false;

    document.addEventListener('keydown', function (event) {
      var x = event.keyCode;
      if (event.keyCode == 8) {
        // backspace
        console.log('backSpace');
        if (thatGame.keyboardInput.length > 0) {

          thatGame.keyboardInput.pop();

          thatGame.clearOtherMatched();

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
    this.gameInterval = setInterval(this.mainGame, 1000 / 50);

  }

  mainGame() {

    if (thatGame.gameStarted) {
      thatGame.newWordTimer++;
      if (thatGame.newWordTimer == 80) {
        let arg = thatGame.getRandomWord();
        if (arg) {
          let word = new Word(arg);
          thatGame.displayWords.push(word);
          thatGame.newWordTimer = 0;
        }


      }

      for (var i = 0; i < thatGame.displayWords.length; i++) {
        thatGame.displayWords[i].draw();

        thatGame.displayWords[i].move();

        thatGame.displayScore();

        if (thatGame.displayWords[i].getY() >= 500) {
          console.log('gameover');
          thatGame.gameOverElement.style.display = 'block';
          thatGame.gameStarted = false;
        }
      }

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
    if (this.wordList.length === 0) {
      this.lastWord = true;
    }
    var ret = this.wordList[num];
    this.wordList.splice(num, 1);

    return ret;
  }

  checkIfInputMatched() {
    let inputLength = thatGame.keyboardInput.length;

    for (var i = 0; i < thatGame.displayWords.length; i++) {

      if (thatGame.displayWords[i].word.slice(0, inputLength) === thatGame.keyboardInput.join('')) {
        console.log('Match: ', thatGame.displayWords[i].word.slice(0, inputLength));

        thatGame.displayWords[i].matched = true;

        var totalMatched = thatGame.displayWords[i].matchUpdate(inputLength);

        if (totalMatched) {

          thatGame.displayWords.splice(i, 1);
          thatGame.score++;

          thatGame.keyboardInput = [];
          thatGame.displayInput();

          console.log('Score: ', thatGame.score);

          if (thatGame.lastWord) {
            console.log('winner')
            thatGame.gameWinnerElement.style.display = 'block';
            thatGame.gameStarted = false;
          }
          thatGame.clearOtherMatched();
        }

      }
    }
  }

  clearOtherMatched() {
    for (var i = 0; i < thatGame.displayWords.length; i++) {
      if (thatGame.displayWords[i].matched === true) {
        thatGame.displayWords[i].matched = false;
        thatGame.displayWords[i].clearAllColor();
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
    this.x = getRandomArbitrary();
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

      document.getElementById('game-container').removeChild(this.element);

      return true;

    } else {

      return false;
    }
  }

  clearAllColor() {
    for (var i = 0; i < this.letters.length; i++) {

      this.lettersSpan[i].style.color = 'black';
    }
  }

}

function getRandomArbitrary() {
  return Math.random() * (900 - 100) + 10;
}

var game = new Game();