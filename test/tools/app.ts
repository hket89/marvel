import Router from '@koa/router';
import request from 'supertest';

import { errorHandler } from '../../src/lib/errors/errorHandler';
import { createApp } from '../../src/lib/server';

export const app = (router: Router) =>
  request(
    createApp(errorHandler, router.allowedMethods(), router.routes()).callback()
  );
