import express from 'express';
import { connection } from "./src/db/connection";
import { User } from './src/models/user';
import { Post } from './src/models/post';
import { Action } from './src/models/action';
import { Followers } from './src/models/followers';
import { Session } from './src/models/session';


const app = express();
app.use(express.json())



const port = 3000;
app.listen(port,async()=>{
    console.log('listening on 3000');
    await connection()
    await User;
    await Post;
    await Action;
    await Followers;
    await Session;
});

app.post('/create-user', async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        full_name,
        bio ,
        profile_pic} = req.body;
  
      // await newUser.save();
      res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Failed to create user." });
    }
  });

