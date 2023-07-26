import Hapi from '@hapi/hapi';
import { signup, login, addProduct } from '../controller/authController';
import { validateToken } from '../middleware/validateToken';

require('dotenv/config')
const api = process.env.API_URL;
console.log(api)
const authRoutes = [
  {
    method: 'POST',
    path: api+'/signup',
    handler: signup,
  },
  {
    method: 'POST',
    path: api+'/signup/login',
    handler: login,
  },

  {
    method: 'POST',
    path: api+'/addProduct',
    handler: addProduct,
  },
   
 

       


  


  {
    method: 'POST',
    path: api+ '/signup/login/home',
    handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      // Get the token from the request headers
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return h.response({ message: 'Missing authentication token' }).code(401);
      }

      try {
        // Validate the token
        const decodedToken = validateToken(token);
        // You can use the `decodedToken` to identify the user and perform actions.
        // For example, you can get the `customerId` from the decoded token and fetch the customer from the database.

        return h.response({ message: 'Accessed successfully : Ecommerce home page' });
      } catch (error) {
        return h.response({ message: 'Invalid token' }).code(401);
      }
    },
  },
];

export default authRoutes;

