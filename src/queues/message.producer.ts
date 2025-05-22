import { winstonLogger } from '@eoladapo/jobman-shared';
import { config } from '@chat/config';
import { Channel } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@chat/queues/connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'ChatServiceProducer', 'debug');

export const publishDirectMessage = async (
  channel: Channel,
  exchangeName: string,
  routingKey: string,
  message: string,
  logMessage: string
): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    await channel.assertExchange(exchangeName, 'direct');
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'ChatService error publishDirectMessage() method:', error);
  }
};
