import mongoose from 'mongoose';
import { env } from './env';

export const dbConfig = {
  uri: env.MONGODB_URI,
  options: {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  } as mongoose.ConnectOptions,
};
