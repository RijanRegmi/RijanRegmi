import cors from 'cors';
import { corsConfig } from '../config/cors';

export const corsMiddleware = cors(corsConfig);
