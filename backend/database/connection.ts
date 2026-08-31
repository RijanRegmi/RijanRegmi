import mongoose from 'mongoose';
import { dbConfig } from '../config/db';
import { logger } from '../utils/logger';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB with connection caching for serverless & long-running instances
 */
export async function connectDatabase(): Promise<typeof mongoose> {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    logger.info(`Connecting to MongoDB...`);
    cached.promise = mongoose
      .connect(dbConfig.uri, dbConfig.options)
      .then((mongooseInstance) => {
        logger.info('Connected to MongoDB successfully');
        return mongooseInstance;
      })
      .catch((err) => {
        logger.error('Failed to connect to MongoDB:', err.message);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    logger.info('Disconnected from MongoDB');
  }
}
