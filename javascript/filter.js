// /Use .filter() to filter an Array
// filter() returns a new array of filter elements that meet a certain condition. The filter() method creates a new array with all elements that pass the test implemented by the provided function.
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
//-------> Output: Array ["exuberant", "destruction", "present"]

//-------> Output: ["exuberant", "destruction", "present"]