function asyncFunction() {
    setTimeout(() => {
      console.log("This is an asynchronous function.");
    }, 2000);
  }
  
  console.log("Before calling asyncFunction.");
  asyncFunction();
  console.log("After calling asyncFunction.");



  //This demonstrates the asynchronous behavior of setTimeout. The code continues to execute after calling asyncFunction without waiting for the setTimeout delay. 