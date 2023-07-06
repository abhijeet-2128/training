
const prObj1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
     let roll = [1,2128,3,4,5];
     resolve(roll); //for success
   
  //if not
  // reject('Error while fetching Api');
  },2000);
});

const getBiodata = (indexData) =>{
  return new Promise((resolve,reject)=>{
      setTimeout((indexData)=>{
        let biodata ={
        name:'Abhi',
        age:20
        }
        resolve(`${indexData} and ${biodata.name} and ${biodata.age}`);
      },2000,indexData); 
  })
}

async function getData(){  //adding async keyword
    //code 
   const rolldata = await prObj1; //to wait 
   console.log(rolldata);
}
getData() //immediately generates an output
// conditon until doesnt fullfiled it is stopped
