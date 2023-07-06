// here the number variable is defined globally 
// var number = 50

// function print() {
//   var square = number * number
//   console.log(square)
// }

// console.log(number) // 50

// print() // 2500



// Here the variable number is defined locally
function print() {
    var number = 50
    var square = number * number
    console.log(square)
  }
  
  print() // 2500
  
  // console.log(number)
  document.write(number)



  name = 'Jack'; 

// Using var
var price = 100;

// Using let
let isPermanent = false; 
// Using const
const PUBLICATION = 'freeCode' 