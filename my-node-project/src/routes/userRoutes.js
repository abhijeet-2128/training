const express = require('express');
const router = express.Router();

//Route : GET /users
router.get('/',(req,res)=>{
  res.send('List of users')
});

//Route : GET /users/:id
router.get('/id' ,(req,res)=>{
  const userId = req.params.id;
  res.send(`User with id ${userId}`)
});

//Route: POST /users
router.post('/',()=>{
    const userData = req.body;
    res.send('User created');
});
module.exports = router;
