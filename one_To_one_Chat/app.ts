import express from 'express';
import { sequelize } from './models';
import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';

const app = express();

app.use(express.json());

// Add more routes if needed
app.use(authRoutes);
app.use(messageRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
