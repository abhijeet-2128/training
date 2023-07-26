import Hapi from '@hapi/hapi';
import bcrypt from 'bcrypt';
import { Customer, customerSignupJoiSchema ,customerLoginJoiSchema} from '../models/customers';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { log } from 'console';
import { Product, productJoiSchema } from '../models/products';


dotenv.config();
const secretKey = process.env.SECRET_KEY || 'default-secret-key';




export const signup = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  try {
    const { error, value } = customerSignupJoiSchema.validate(request.payload);

    if (error) {
      return h.response({ message: 'Invalid payload', error }).code(400);
    }

    const { email, password ,full_name} = value;

    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return h.response({ message: 'Email already registered' }).code(409);
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new customer
    const newCustomer = new Customer({ email, password: hashedPassword ,full_name});
    await newCustomer.save();

    return h.response({ message: 'Signup successful' }).code(201);
  } catch (error) {
    return h.response({ message: 'Error signing up', error }).code(500);
  }
};

export const login = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  try {
    const { error, value } = customerLoginJoiSchema.validate(request.payload);

    if (error) {
      return h.response({ message: 'Invalid payload', error }).code(400);
    }

    const { email, password } = value;

    // Check if the customer exists
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return h.response({ message: 'Customer not found' }).code(404);
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return h.response({ message: 'Invalid credentials' }).code(401);
    }

    // Create a JWT token with the customer's ID as the payload
    const secretKey = process.env.SECRET_KEY || 'default-secret-key';
    console.log(secretKey);
    
    const token = jwt.sign({ customerId: customer._id }, secretKey, { expiresIn: '1h' });

    // You can also add other customer-related data to the token payload if needed.
    // For example, { customerId: customer._id, email: customer.email, role: customer.role, ... }

    return h.response({ message: 'Login successful', token });
  } catch (error) {
    return h.response({ message: 'Error logging in', error }).code(500);
  }
};




export const addProduct = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const token = request.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return h.response({ message: 'Missing authentication token' }).code(401);
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, secretKey) as { customerId: string };
    if (!decodedToken || !decodedToken.customerId) {
      return h.response({ message: 'Invalid authentication token' }).code(401);
    }

    const { error, value } = productJoiSchema.validate(request.payload);

    if (error) {
      return h.response({ message: 'Invalid payload', error }).code(400);
    }

    const { name, price, description ,category ,stock_quantity,images,attributes} = value;

    // Create the new product
    const newProduct = new Product({ name, price, description,category ,stock_quantity,images,attributes });
    await newProduct.save();

    return h.response({ message: 'Product added successfully' }).code(201);
  } catch (error : any) {
    if (error.name === 'JsonWebTokenError') {
      return h.response({ message: 'Invalid authentication token' }).code(401);
    }
    return h.response({ message: 'Error adding product', error }).code(500);
  }
};











 
  

  
