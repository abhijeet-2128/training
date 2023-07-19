import mongoose, { Document, Schema } from 'mongoose';

interface ISession extends Document {
  user_id: Schema.Types.ObjectId;
  token: string;
  expires_at: Date;
}

const sessionSchema = new mongoose.Schema<ISession>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

export const Session = mongoose.model<ISession>('Session', sessionSchema);


