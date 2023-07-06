// The map() method calls a callback function on every element of an array and returns a new array that contains the results


const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
//-------> Output: [2, 8, 18, 32]