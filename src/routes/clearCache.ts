import { cache } from '../lib/cache';
import { Middleware } from '../types/koa';
import { ALL_MARVEL_CHARACTER_ID } from './characters/getAllCharacterIds';

export const clearCacheHandler: Middleware = (ctx) => {
  cache.del(ALL_MARVEL_CHARACTER_ID);
  ctx.body = 'ok';
};
