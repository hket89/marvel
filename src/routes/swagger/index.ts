import { koaSwagger } from 'koa2-swagger-ui';

import openApi from './openapi.json';

const spec = openApi;

export const swagger = koaSwagger({
  routePrefix: '/api-docs', // host at /swagger instead of default /docs
  swaggerOptions: { spec }
});
