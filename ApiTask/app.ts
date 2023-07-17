import express from 'express';
import authRoutes from '../ApiTask/src/routes/authRoutes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});