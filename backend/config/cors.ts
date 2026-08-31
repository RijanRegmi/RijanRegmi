import { CorsOptions } from 'cors';
import { env } from './env';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || env.CORS_ORIGIN.includes(origin) || env.isDevelopment) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};
