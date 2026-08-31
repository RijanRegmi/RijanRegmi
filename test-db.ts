import { connectDatabase, disconnectDatabase } from './backend/database/connection';
import { logger } from './backend/utils/logger';

async function testDatabase() {
  logger.info('--- Testing MongoDB Database Connection ---');
  try {
    const conn = await connectDatabase();
    logger.info(`✅ Connection Successful!`);
    logger.info(`Database Name: ${conn.connection.name}`);
    logger.info(`Host: ${conn.connection.host}`);
    logger.info(`Port: ${conn.connection.port}`);
  } catch (error: any) {
    logger.error('❌ Connection Failed:', error.message);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
}

testDatabase();
