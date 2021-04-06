import { router } from 'src/routes';

import { app } from './tools/app';

describe('GET / - a simple api endpoint', () => {
  it('Health Check', async () => {
    const result = await app(router).get('/health');

    expect(result.status).toEqual(200);
    expect(result.text).toEqual('ok');
  });
});
