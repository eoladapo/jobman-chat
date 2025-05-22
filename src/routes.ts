import { Application } from 'express';
import { verifyGatewayRequest } from '@eoladapo/jobman-shared';

const BASE_PATH = '/api/v1/message';

const appRoutes = (app: Application): void => {
  // app.use('', healthRoutes());3
  app.use(BASE_PATH, verifyGatewayRequest);
};

export { appRoutes };
