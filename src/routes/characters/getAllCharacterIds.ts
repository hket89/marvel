import { CharacterResponse } from 'src/types/marvel';

import { cache } from '../../lib/cache';
import { getCharacters } from '../../services/marvel';
import { Middleware } from '../../types/koa';

const CACHE_KEY = 'ALL_MARVEL_CHARACTER_ID' as const;
const LIMIT = 100 as const;

const getFromAPI = async (limit: number) => {
  const firstResult = await getCharacters({ params: { limit } });

  const {
    data: { total }
  } = firstResult;

  const count = Math.floor(total / limit);

  const result = (await Promise.all(
    Array.from(Array(count), (_, x) =>
      getCharacters({ params: { offset: (x + 1) * limit, limit } })
    )
  )) as CharacterResponse[];

  return [firstResult, ...result]
    .map((x) => x.data.results.map((y) => y.id))
    .flat();
};

export const getData = async () => {
  const value = cache.get<number[]>(CACHE_KEY);

  if (value) {
    return value;
  }

  const result = await getFromAPI(LIMIT);
  cache.set(CACHE_KEY, result);

  return result;
};

export const getAllCharacterIdsHandler: Middleware = async (ctx) => {
  const results = await getData();
  ctx.body = results;
};
