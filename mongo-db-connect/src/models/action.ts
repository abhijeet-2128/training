import Joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

interface IAction extends Document {
  user_id: Schema.Types.ObjectId;
  action_type: 'like' | 'comment' 
  post_id?: Schema.Types.ObjectId;
  comment?: {
    user_id: Schema.Types.ObjectId;
    text: string;
    created_at: Date;
    replies: {
      user_id: Schema.Types.ObjectId;
      text: string;
      created_at: Date;
    }[];
  };
  created_at: Date;
}

const actionSchema = new mongoose.Schema<IAction>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action_type: {
    type: String,
    enum: ['like', 'comment', 'follow'], 
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: function (this: IAction) {
      return ['like', 'comment'].includes(this.action_type);
    },
  },
  comment: {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: String,
    created_at: { type: Date, default: Date.now },
    replies: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: String,
        created_at: { type: Date, default: Date.now },
      },
    ],
  },
  created_at: { type: Date, default: Date.now },
});

export const Action = mongoose.model<IAction>('Action', actionSchema);
const validateAction = (action: any) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    action_type: Joi.string().valid('like', 'comment', 'follow').required(),
    post_id: Joi.when('action_type', {
      is: Joi.string().valid('like', 'comment'),
      then: Joi.string().required(),
    }),
    comment: Joi.object({
      user_id: Joi.string(),
      text: Joi.string().required(),
      created_at: Joi.date().default(Date.now),
      replies: Joi.array().items(
        Joi.object({
          user_id: Joi.string(),
          text: Joi.string().required(),
          created_at: Joi.date().default(Date.now),
        })
      ),
    }),
    created_at: Joi.date().default(Date.now),
  });

  return schema.validate(action);
};