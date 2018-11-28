var container = document.getElementById('container');
var containerWidth = container.style.width;
var containerHeight = container.style.height;
var point = {
  x: 50,
  y: 0
}
var movement = 1;


var ball = document.createElement("div");
ball.style.left = point.x + 'px';
ball.style.top = point.y + 'px';
ball.style.width = "20px";
ball.style.height = '20px';
ball.style.borderRadius = '50%';
ball.style.backgroundColor = 'black';
ball.style.position = 'absolute';
document.getElementById("container").appendChild(ball);


function start() {
  setInterval(bounch, 1);
}

function bounch() {
  if (point.x >= parseInt(containerHeight, 10) || point.x < 0) {
    movement = movement * -1;
  }
  point.x = point.x + movement;
  console.log(point.x)
  ball.style.top = point.x + "px";
}


start();