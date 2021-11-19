import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

const USERS_MODEL = 'users';
const UsersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    tokenSubject: {
      type: String,
      default: '',
    },
    token: {
      type: String,
      default: '',
    },
    tokenExpires: {
      type: Date,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      // select: true,
      default: false,
    },
  },
  { timestamps: true },
);

UsersSchema.pre('save', async function (next) {
  try {
    const hased = await bcrypt.hash(this['password'], 10);
    this['password'] = hased;

    return next();
  } catch (err) {
    return next(err);
  }
});

export { UsersSchema, USERS_MODEL };
