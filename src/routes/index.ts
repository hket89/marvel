import Router from '@koa/router';

import { characterRouter } from './characters';
import { healthCheckHandler } from './healthCheck';

export const router = new Router()
  .get('/health', healthCheckHandler)
  .use('/characters', characterRouter.routes());
