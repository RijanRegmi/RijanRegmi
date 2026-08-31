import app from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './database/connection';
import { logger } from './utils/logger';

async function startServer() {
  try {
    // Attempt database connection on startup
    try {
      await connectDatabase();
    } catch (dbErr) {
      logger.warn('Could not connect to MongoDB initially. Server will start and retry on request.');
    }

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      logger.info(`📡 API Health: http://localhost:${env.PORT}/api/health`);
    });

    // Graceful Shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

export default app;
