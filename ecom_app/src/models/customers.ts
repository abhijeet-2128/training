import mongoose, { Schema, Document } from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';

export interface CustomerDoc extends Document {
  email: string;
  password: string;
  full_name?: string; // Marking full_name as optional
  created_at: Date; // Adding created_at field
  updated_at: Date; // Adding updated_at field
  
  comparePassword(password: string): Promise<boolean>;

  // Add other fields as needed (e.g., name, address, etc.)
}

const customerSchema: Schema<CustomerDoc> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String }, // No need to mark it as required here
  created_at: { type: Date, default: Date.now }, // Adding created_at field with default value
  updated_at: { type: Date, default: Date.now }, // Adding updated_at field with default value
  // Add other fields as needed (e.g., name, address, etc.)
});

customerSchema.pre<CustomerDoc>('save', function (next) {
  this.updated_at = new Date(); // Update the updated_at field whenever the document is saved
  next();
});

customerSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Customer = mongoose.model<CustomerDoc>('Customer', customerSchema);

// Define the Joi schema for signup validation
const customerSignupJoiSchema = Joi.object<CustomerDoc>({
  email: Joi.string().email().required(),
  password: Joi.string()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'))
  .required()
  .messages({
    'string.pattern.base':
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
  }),
  full_name: Joi.string().required(), // Requiring full_name for signup
  // Add other fields as needed (e.g., name, address, etc.)
});

// Define the Joi schema for login validation
const customerLoginJoiSchema = Joi.object<CustomerDoc>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  // No need to include full_name in the login schema
});

// Export the Mongoose model and the Joi schemas
export { Customer, customerSignupJoiSchema, customerLoginJoiSchema };
