import Router from '@koa/router';

import { characterRouter } from './characters';
import { clearCacheHandler } from './clearCache';
import { healthCheckHandler } from './healthCheck';

export const router = new Router()
  .get('/health', healthCheckHandler)
  .get('/clear-cache', clearCacheHandler)
  .use('/characters', characterRouter.routes());
