const myPromise = new Promise((resolve, reject) => {
	if ((Math.random()-0.5)*2 > 0) {
		resolve('Hello, I am positive number!');
	}
	reject(new Error('I failed some times'));
})

//handling the promise
myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });