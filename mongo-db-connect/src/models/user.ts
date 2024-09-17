import Joi from 'joi';
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  full_name: string;
  bio: string;
  profile_pic: string;
  created_at: Date;
  updated_at: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  username: String,
  email: String,
  password: String,
  full_name: String,
  bio: String,
  profile_pic: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);


export default User;
