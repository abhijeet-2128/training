import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '      ', 
  database: 'test_adv',
});

// Define a function to handle the database connection
export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the Node.js process with a failure code (1) if there's an error
  }
}

// Call the function to connect to the database
connectToDatabase();

export default sequelize;
