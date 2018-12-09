console.log('typing-tutor');


class Game {
  constructor() {
    this.thatGame = this;
    this.element = undefined;
    this.gameStarted = undefined;
    this.score = undefined;
    this.wordList = ['kindle', 'apple', 'ball', 'cat', 'dog', 'elephant', 'fish', 'enigma', 'grape', 'heed', 'blunderbuss', 'podium', 'talisman'];

    this.init();
    this.word = new Word('apple');
  }

  init() {
    console.log('init', this.element);
    this.initElements();

  }

  initElements() {
    this.element = document.getElementsByClassName('game-container')[0];
    this.score = 0;
    this.gameStarted = false;

    console.log('init', this.element);


    // this.element.innerHTML='this'+this.score;
    var x = this.getRandomWord();
    // console.log(x)
  }


  startGame() {
    this.gameStarted = true;
    var gameInterval = setInterval(mainGame, 1000 / 100);
  }


  getRandomWord() {
    return this.wordList[Math.floor(Math.random() * this.wordList.length)];
  }

}


class Word {
  constructor(word) {
    this.thatWord = this;
    this.word = word;
    this.delete = false;
    this.x = 0;
    this.y = -20;
    this.letters = [];
    this.lettersSpan = [];
    this.element = undefined;
    this.init();
  }

  init() {
    this.element = document.createElement('span');
    this.letters = this.word.split('');

    for (var i = 0; i < this.letters.length; i++) {
      console.log(this.letters[i]);
      var letterSpanEl = document.createElement('span');
      letterSpanEl.innerHTML = this.letters[i];
      this.element.appendChild(letterSpanEl);
    }

    console.log(this.element);
    this.draw();

  }

  draw() {
    this.element.style.position = 'absolute';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.color='black';
    document.getElementById('game-container').appendChild(this.element);
  }
}





var game = new Game();