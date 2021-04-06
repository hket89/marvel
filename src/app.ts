import { config } from './config';
import { errorHandler } from './lib/errors/errorHandler';
import { createApp } from './lib/server';
import { router } from './routes';
import { swagger } from './routes/swagger';

const app = createApp(errorHandler, router.allowedMethods(), router.routes());

const listener = app.listen(config.port, () => {
  const address = listener.address();

  if (typeof address === 'object' && address) {
    // eslint-disable-next-line no-console
    console.debug(`listening on port ${address.port}`);
  }
});

app.use(swagger);
export default listener;
