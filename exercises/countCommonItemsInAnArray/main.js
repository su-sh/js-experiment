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