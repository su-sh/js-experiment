/*
☐ Count of items in an array.
Input: ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock']
Output:
  {
    John: 3,
    Mary: 1,
    Sherlock: 2
  }
*/

var input = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock'];
console.log('Input:');
console.log(input);

// Mapper function
var map = input.map(function (name) {
  var person = {
    name: name,
    count: 1
  }
  return person;
});

console.log('Map:');
console.log(map);


// Reducer function
var reduce = map.reduce(function (reduced, person) {
  if (reduced.length == 0) {
    reduced.push(person);
  } else {
    var newEntry = true;
    for (var i = 0; i < reduced.length; i++) {
      if (reduced[i].name == person.name) {
        reduced[i].count++;
        newEntry = false;
        break;
      }
    }
    if (newEntry) {
      reduced.push(person);
    }
  }

  return reduced;
}, []);

console.log('Reduce:');
console.log(reduce);






// simple soln
var output = [];
for (var i = 0; i < input.length; i++) {

  if (output.length == 0) {
    var person = {
      name: input[i],
      count: 1
    };
    output.push(person);
    console.log(person);
  } else {
    var newEntry = true;
    for (var j = 0; j < output.length; j++) {
      if (output[j].name == input[i]) {
        output[j].count++;
        newEntry = false;
        break;
      }
    }
    if (newEntry) {
      var person = {
        name: input[i],
        count: 1
      };
      output.push(person);
    }
  }
}

console.log('Simple Solution')
console.log(output);