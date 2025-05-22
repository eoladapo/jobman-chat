// use amqplib
import { winstonLogger } from '@eoladapo/jobman-shared';
import { config } from '@chat/config';
import { Logger } from 'winston';
import client, { Channel } from 'amqplib';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'ChatQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel = await connection.createChannel();
    log.info('Chat server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'ChatService error createConnection() method:', error);
    return undefined;
  }
}

interface MyChannel {
  close(): Promise<void>;
}

interface MyConnection {
  close(): Promise<void>;
}

function closeConnection(channel: MyChannel, connection: MyConnection): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
