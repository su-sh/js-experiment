/*
 Write a function such that it takes list of people with nested children and normalizes it as shown in example

var people = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [{
      id: 4,
      name: "Daenerys Targaryen"
    },{
      id: 5,
      name: "Rhaegar Targaryen",
      children: [{
        id: 6,
        name: "Aegon Targaryen"
      }]
    }] 
  },{
    id: 3,
    name: "Rhaelle Targaryen"
  }],
}];

var output = {
  1: {
    id: 1,
    name: "Aegon Targaryen",
    children: [2, 3]
  },
  2: {
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [4, 5]
  },
  3: {
    id: 3,
    name: "Rhaelle Targaryen",
    children: []
  },
  4: {
    id: 4,
    name: "Daenerys Targaryen",
    children: []
  },
  5: {
    id: 5,
    name: "Rhaegar Targaryen",
    children: [6]
  },
  6: {
    id: 6,
    name: "Aegon Targaryen",
    children: []
  }
}
 */
var people = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
    id: 2,
    name: "Jaehaerys Targaryen",
    children: [{
      id: 4,
      name: "Daenerys Targaryen"
    }, {
      id: 5,
      name: "Rhaegar Targaryen",
      children: [{
        id: 6,
        name: "Aegon Targaryen"
      }]
    }]
  }, {
    id: 3,
    name: "Rhaelle Targaryen"
  }],
}];




var output=[];
var newObj = {};


function normalize(input) {
  for (var i=0; i < input.length; i++) {
    newObj = {
      id: input[i].id,
      name: input[i].name,
      children: []
    }
    if (input[i].children === undefined) {
      output.push(newObj);
      return;
    }
    for (var j = 0; j < input[i].children.length; j++) {
      (newObj.children).push(input[i].children[j].id);
    }
    output.push(newObj);
    input = input[i].children;
    normalize(input);

  }
}

normalize(people);
console.log(output)