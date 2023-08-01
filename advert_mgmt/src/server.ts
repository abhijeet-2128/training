import express, { Express, Request, Response } from 'express';
import sequelize from './db/connect';
import userRoutes from './routes/userRoutes';
// import { signup } from './controllers/user.controllers';
// import userRoutes

const app: Express = express();

const port = 3000;

app.use(express.json());





app.use('/api',userRoutes);   //--- all routes




app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});


app.listen(port, async() => {
  sequelize
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

