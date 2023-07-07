const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  res.send('Hello Authentication page!')
  
});
app.post("/auth",(req,res)=>{
    try{
    var name=req.body.a;
    var passwrd=req.body.b;
    if(passwrd=="2128")
    {
        
            // res.send("valid user");
            res.send(`welcome ${name} `);
        

    }
    else
    {
        res.send("not valid");
    }}
    catch{
        console.log("error");
    }
})
app.listen(4000,()=>{
    console.log("listening on port 3000");
});