var fruits = [
  {id: 1, name: 'Banana', color: 'Yellow'},
  {id: 2, name: 'Apple', color: 'Red'}
];

function searchByName(nameKey, array){
  for (var i=0; i < array.length; i++) {
      if (array[i].name === nameKey) {
          return array[i];
      }
  }
}

var result =  searchByName("Apple", fruits);
console.log(result);