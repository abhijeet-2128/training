
function greet(city, country){
    console.log(`Hello, ${this.name}, ${this.age}, ${this.empid}`+ city + " " + country);
}
const person = {
  name: 'Abhijeet', age:20, empid : 21
}
greet.call(person, "noida","india");
greet.apply(person, [" mirzapur", "india"]);
let abc=greet.bind(person, "New Yorkl", "USA");
abc();

// console.log(abc())




