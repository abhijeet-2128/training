const obj = {
    name: "John",
    greet: function(message) {
      console.log(`${message}, ${this.name}!`);
    }
  };
  
  const otherObj = {
    name: "Jane"
  };
  
  const boundGreet = obj.greet.bind(otherObj);
  boundGreet("Hello"); // Output: Hello, Jane!
  
  obj.greet.call(otherObj, "Hi"); // Output: Hi, Jane!
  
  obj.greet.apply(otherObj, ["Hey"]); 