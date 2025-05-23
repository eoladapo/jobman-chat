import { Application } from 'express';
import { verifyGatewayRequest } from '@eoladapo/jobman-shared';
import { healthRoutes } from './routes/health';
import { messageRoutes } from './routes/message';

const BASE_PATH = '/api/v1/message';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, messageRoutes());
};

export { appRoutes };
