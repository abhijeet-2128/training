const express = require('express')
const app = express()

app.use(express.json());
app.post('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/add',  (req, res) =>{
  var num1 = req.body.a;
  var num2 = req.body.b;
  var sum = num1 + num2;
  console.log(sum);
  res.send(`Sum is ${sum}`);  //string is always passed in send
})



app.listen(3000,(error)=> {
  console.log('Successfully started express application!')
})