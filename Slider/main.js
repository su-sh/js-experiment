var width = 800;
var height = 450;
var x = 0;
var direction = 1;
var sliderContainerWrapper = document.getElementById('slider-container-wrapper');
var sliderContainer = document.getElementById('slider-container');
var images = document.getElementById('slider-container').getElementsByTagName('img');


var speed;
var resetSpeed = 10;
var defaultSpeed = 10;
var defauleWaitTime = 1500;

var leftInterval;


var lastWaitTimeout;
var waitTImeout;;
// background container
sliderContainerWrapper.style.width = width + 'px';
sliderContainerWrapper.style.height = height + 'px';
sliderContainerWrapper.style.overflow = 'hidden';
sliderContainerWrapper.style.position = 'relative';

sliderContainer.style.position = 'absolute';
sliderContainer.style.width = (800*images.length)+'px';

//set css properties to img
for (var i = 0; i < images.length; i++) {
  images[i].style.cssFloat = 'left';
  images[i].style.display = 'block';
  images[i].style.width = width;
  images[i].style.height = height;
  images[i].style.objectFit = 'cover';
  console.log(images[i]);
}


// Button
var buttonLeft = document.createElement("button");
buttonLeft.innerHTML = "<";
var buttonRight = document.createElement("button");
buttonRight.innerHTML = ">";

sliderContainerWrapper.appendChild(buttonLeft);
sliderContainerWrapper.appendChild(buttonRight);

buttonLeft.style.position = 'absolute';
buttonLeft.style.left = "8px";
buttonLeft.style.top = '48%';
buttonLeft.style.borderRadius = '50%';
buttonLeft.addEventListener("click", leftClick);

buttonRight.style.position = 'absolute';
buttonRight.style.top = '48%';
buttonRight.style.left = width - 30 + 'px';
buttonRight.style.borderRadius = '50%';
buttonRight.addEventListener("click", rightClick);

function leftClick() {
  console.log('leftClick: ', x);
  if (x < 0) {
    console.log('go to last item');
  } else {
    clearAll();
    direction = -1;
    slide();
    
    autoRestart();
  }
}

function rightClick() {
  console.log('rightClick: ', x);
  if (x >= width * (images.length - 1)) {
    console.log('go to first item');
    clearAll();
    restart();
  } else {
    direction = 1;
    clearAll();
    mainStart();
  }
}

function clearAll() {
  clearInterval(mainInterval);
  clearInterval(resetInterval);
  clearTimeout(lastWaitTimeout);
  clearTimeout(waitTImeout);

}
//wait and restart
function lastWait() {
  lastWaitTimeout = setTimeout(autoRestart, defauleWaitTime);
}

// default
function waitTime() {
  waitTImeout = setTimeout(mainStart, defauleWaitTime);
}

function autoRestart() {
  direction = -1;
  console.log(x);
  restartInterval = setInterval(restart, resetSpeed);
}

// left)_

function restart() {
  sliderContainer.style.left = '-' + x + 'px';
  speed = resetSpeed;
  x = x + (speed * direction);
  console.log('xxxx: ', x);
  if (x <= 0) {
    clearInterval(restartInterval);
    x = 0;
    direction = 1;
    speed = defaultSpeed;
    mainStart();
  }
}


function slide() {
  sliderContainer.style.left = '-' + x + 'px';
  if (x == width * (images.length - 1)) {
    // deadEnd

    console.log('last', x);
    clearInterval(mainInterval);

    lastWait();
  } else if ((x) == 0 || (x % width) == 0) {

    console.log('default wait');
    clearInterval(mainInterval);
    waitTime();
  }
  x = x + (speed * direction);
}

var mainInterval;

function mainStart() {
  console.log('Start Main');
  speed = defaultSpeed;
  mainInterval = setInterval(slide, defaultSpeed);
}

mainStart();