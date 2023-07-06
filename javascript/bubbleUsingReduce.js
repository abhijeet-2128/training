const bs = (arr) => {
    return arr.reduce((acc, val, i, arr) => {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
        return arr;
      }, arr);
    };
    
    let arr = [9,56,56,213,4,5,78];
    console.log(bs(arr));
