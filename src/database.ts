import { winstonLogger } from '@eoladapo/jobman-shared';
import { Logger } from 'winston';
import { config } from '@chat/config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'chatDatabase', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Chat Service - Successfully connected to database');
  } catch (error) {
    log.error('error', 'Chat Service databaseConnection() method:', error);
  }
};

export { databaseConnection };
