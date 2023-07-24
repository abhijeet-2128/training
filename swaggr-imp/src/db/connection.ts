import mongoose, { mongo } from 'mongoose';
const url = "mongodb://localhost:27017/newInstaDb";



export const connection = async()=>{
    try{
        await mongoose.connect(url)
        console.log("Succesfully connected to the db");
        
    }catch(e){
        console.log(e,"ERRRRRR");
    }

}