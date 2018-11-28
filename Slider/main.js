var width = 800;
var height = 450;
var x = 0;
var direction = 1;
var slideSpeed = 4;
var holdTime = 2000;

var sliderContainerWrapper;
var sliderContainer;
var images;

var slideInterval;
var slideTimeout;

var buttonLeft;
var buttonRight;


function main() {
  slideTimeout = setTimeout(function () {
    slideInterval = setInterval(slide, slideSpeed);
  }, 2000);
}

function buttonClicked() {
  clearInterval(slideInterval);
  clearTimeout(slideTimeout);
  slideInterval = setInterval(slide, slideSpeed);
}

function slide() {
  sliderContainer.style.left = '-' + x + 'px';

  if (x >= width * (images.length - 1)) {
    direction = -1;
  } else if (x <= 0) {
    direction = 1;
  }

  if (x % width === 0) {
    sliderContainer.style.left = '-' + x + 'px';
    clearInterval(slideInterval);
    slideTimeout = setTimeout(function () {
      slideInterval = setInterval(slide, slideSpeed);
    }, holdTime);
  }

  x = x + (slideSpeed * direction);
}


function leftClick() {
  console.log('left');
  direction = -1;
  buttonClicked();
}

function rightClick() {
  console.log('right');
  direction = 1;
  buttonClicked();
}


function initElements() {

  sliderContainerWrapper = document.getElementById('slider-container-wrapper');
  sliderContainer = document.getElementById('slider-container');
  images = document.getElementById('slider-container').getElementsByTagName('img');

  sliderContainerWrapper.style.width = width + 'px';
  sliderContainerWrapper.style.height = height + 'px';
  sliderContainerWrapper.style.overflow = 'hidden';
  sliderContainerWrapper.style.position = 'relative';

  sliderContainer.style.position = 'absolute';
  sliderContainer.style.width = (width * images.length) + 'px';

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
  buttonLeft = document.createElement("button");
  buttonLeft.innerHTML = "<";
  buttonRight = document.createElement("button");
  buttonRight.innerHTML = ">";

  buttonLeft.style.position = 'absolute';
  buttonLeft.style.left = "8px";
  buttonLeft.style.top = '40%';
  buttonLeft.style.backgroundColor = 'black';
  buttonLeft.style.opacity = '.5';
  buttonLeft.style.color = 'white';
  buttonLeft.style.height = '100px';
  buttonLeft.style.outline = 'none';
  buttonLeft.style.borderRadius = '15%';

  buttonRight.style.position = 'absolute';
  buttonRight.style.left = width - 30 + 'px';
  buttonRight.style.top = '40%';
  buttonRight.style.borderRadius = '20%';
  buttonRight.style.backgroundColor = 'black';
  buttonRight.style.opacity = '.5';
  buttonRight.style.color = 'white';
  buttonRight.style.height = '100px';
  buttonRight.style.outline = 'none';

  buttonLeft.addEventListener("click", leftClick);
  buttonRight.addEventListener("click", rightClick);

  sliderContainerWrapper.appendChild(buttonLeft);
  sliderContainerWrapper.appendChild(buttonRight);

}

initElements();
main();