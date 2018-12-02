var mainDiv = document.getElementById('main-div');

mainDiv.style.width = "100px";

mainDiv.style.height = "100px";
mainDiv.style.backgroundColor = "red";

mainDiv.addEventListener('click', function (e) {

  var color = mainDiv.style.backgroundColor;
  console.log(color);

  if (color === 'red') {
    mainDiv.style.backgroundColor = "green";

  }
  if (color === 'green') {
    mainDiv.style.backgroundColor = "blue";

  }
  if (color === 'blue') {
    mainDiv.style.backgroundColor = "red";

  }
});

var pos = {
  x: 20,
  y: 40
};
var dim = {
  height: 50,
  width: 50
};



var secDiv = document.createElement("div");
secDiv.style.marginLeft = pos.x + 'px';
secDiv.style.marginTop = pos.y + 'px';
secDiv.style.width = dim.height + 'px';
secDiv.style.height = dim.width + 'px';
secDiv.style.backgroundColor = 'blue';
// secDiv.style.position='absolute';

document.getElementById("new-div").appendChild(secDiv);


var index = 0;
var array = ['red', 'green', 'blue'];
secDiv.addEventListener('click', function (e) {
  secDiv.style.backgroundColor = array[index];
  console.log(array[index]);
  index++;
  if (index > array.length - 1) {
    index = 0;
  }
});




var points = [{
    x: 10,
    y: 20,
    width: 10,
    height: 10
  },
  {
    x: 30,
    y: 30,
    width: 20,
    height: 10
  },
  {
    x: 30,
    y: 40,
    width: 10,
    height: 10
  }
]

for (var i = 0; i < points.length; i++) {

  drawPoint(points[i].x, points[i].y,points[i].height,points[i].width);

  // secDiv.style.position='absolute';
}


function drawPoint(x, y,height,width) {
  var point = document.createElement("div");
  point.style.left = x + 'px';
  point.style.top = y + 'px';
  point.style.width = width + 'px';
  point.style.height = height + 'px';
  point.style.backgroundColor = 'black';
  point.style.position='relative';
  document.getElementById("plot-div").appendChild(point);
}