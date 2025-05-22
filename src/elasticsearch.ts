import { Client } from '@elastic/elasticsearch';
import { config } from '@chat/config';
import { Logger } from 'winston';
import { winstonLogger } from '@eoladapo/jobman-shared';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'ChatElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

const checkConnection = async (): Promise<void> => {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`ChatService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.info('Connection to ElasticSearch failed. Retrying...');
      log.log('error', 'ChatService checkConnection() method:', error);
    }
  }
};

export { checkConnection };
