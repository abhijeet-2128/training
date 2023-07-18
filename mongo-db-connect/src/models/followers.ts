import mongoose, { Document, Schema } from 'mongoose';

interface IFollowers extends Document {
  follower_id: Schema.Types.ObjectId;
  following_id: Schema.Types.ObjectId;
  created_at: Date;
}

const followersSchema = new mongoose.Schema<IFollowers>({
  follower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  following_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

export const Followers = mongoose.model<IFollowers>('Followers', followersSchema);

