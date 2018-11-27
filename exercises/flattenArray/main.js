/*
☐ Flatten array:
    Input: [[1, 2, 3], [2, 4, 5], 6]
    Output: [1, 2, 3, 4, 5, 6]

*/

var input = [
  [1, 2, 3],
  [2, 4, 5], 6
];
var output = [];

console.log("input");

console.log(input);

function flatArr(array) {
  for (var i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      // console.log('true');
      flatArr(array[i]);
    } else {
      if(addToArray(array[i],output)){
        output.push(array[i]);

      }

      // output.push(array[i]);

    }
  }
}

function addToArray(input, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === input) {
      console.log('false');
      return false;
    }
  }
  console.log('true');
  return true;
}
flatArr(input);
console.log("output");
console.log(output);


// carBrands.indexOf(car1);