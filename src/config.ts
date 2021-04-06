import './dotenv';

interface Config {
  environment: Environment;

  logLevel: string;
  name: string;

  apikey: string;
  apisecret: string;

  port?: number;
}

type Environment = typeof environments[number];

const environments = ['local', 'test', 'prod'] as const;

const environment = process.env.ENVIRONMENT as Environment;

const configs: Record<Environment, () => Omit<Config, 'environment'>> = {
  local: () => ({
    logLevel: 'debug',
    name: 'marvel',

    apikey: process.env.API_KEY || '',
    apisecret: process.env.API_SECRET || '',

    port: Number(process.env.PORT || '8080')
  }),

  test: () => ({
    ...configs.local(),

    logLevel: 'silent',
    version: 'test'
  }),
  prod: () => ({
    ...configs['local'](),

    logLevel: 'warning'
  })
};

export const config: Config = {
  ...configs[environment](),
  environment
};
