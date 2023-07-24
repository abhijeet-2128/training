// src/app.ts
import swaggerUi from 'swagger-ui-express'; // Import the swagger UI library
import authRoutes from './routes/authRoutes';
import { connection } from './db/connection';
import { Post } from './models/post';
import { Action } from './models/action';
import { Followers } from './models/followers';
import { Session } from './models/session';
// import postRoute from './src/routes/postRoute';
import express from 'express';
import * as swaggerDocument from './swagger/openapi.json';    //importing swagger doc
const app = express();
const port = 3000;

app.use(express.json());


app.use('/user', authRoutes);
// app.use('/user',postRoute);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));  //using swagger document 

app.listen(port, async() => {
  console.log(`Server is running on http://localhost:${port}`);
  await connection();
  // Register the models with the connection (no need for await here)
  Post;
  Action;
  Followers;
  Session;
});

