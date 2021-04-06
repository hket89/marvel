import Router from '@koa/router';
import { errorHandler } from 'src/lib/errors/errorHandler';
import { createApp } from 'src/lib/server';
import request from 'supertest';

export const app = (router: Router) =>
  request(
    createApp(errorHandler, router.allowedMethods(), router.routes()).callback()
  );
