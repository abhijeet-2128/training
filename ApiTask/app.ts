import express from 'express';
import { signup, login } from '../TsStructure/src/controllers/authController';

const app = express();

app.use(express.json());

app.post('/signup', signup);
app.post('/login', login);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});