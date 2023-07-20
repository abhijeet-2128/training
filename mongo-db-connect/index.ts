import express from 'express';
import authRoutes from './src/routes/authRoutes';
import { connection } from './src/db/connection';
import { Post } from './src/models/post';
import { Action } from './src/models/action';
import { Followers } from './src/models/followers';
import { Session } from './src/models/session';
import postRoute from './src/routes/postRoute';
const app = express();

app.use(express.json());


app.use('/user', authRoutes);
app.use('/user',postRoute);

const port = 3000;
app.listen(port, async () => {
  console.log('listening on 3000');
  await connection();
  // Register the models with the connection (no need for await here)
  Post;
  Action;
  Followers;
  Session;
});



