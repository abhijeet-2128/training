// main server file
import Hapi from '@hapi/hapi';
import { connection } from './db/connection';
import authRoutes from './routes/authRoutes';
// Import other route files if you have more routes

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
  });

  // Connect database
  await connection();

  // Register routes
  server.route([...authRoutes]);

  // Start the server
  await server.start();

  console.log('Server running on %s', server.info.uri);
};

// Rest of the code remains unchanged
init();
