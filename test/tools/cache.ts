import { cache } from 'src/lib/cache';

export const cacheSpy = {
  get: () => jest.spyOn(cache, 'get'),
  set: () => jest.spyOn(cache, 'set')
};
