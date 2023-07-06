// function delay(ms){
//  return new Promise(resolve => setTimeout(resolve,ms));
// }

async function asyncFunction(){
    console.log('start');
    // await delay(2000);

    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('end');
}

//revoking asyncFunction
asyncFunction();