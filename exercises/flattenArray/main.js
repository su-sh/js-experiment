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
      output.push(array[i]);
    }
  }
}

flatArr(input);
console.log("output");
console.log(output);