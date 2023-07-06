function simulateAsyncOperation() {
    setTimeout(() => {
      const result = Math.random() * 10;
      if (result < 5) {
        callback(null, result);
      } else {
        callback("Error: Result is greater than 5", null);
      }
    }, 2000);
  }

  function handleResult(error, result) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Result:", result);
    }
  }
  
  console.log("Before calling simulateAsyncOperation.");
  simulateAsyncOperation(handleResult);
  console.log("After calling simulateAsyncOperation.");