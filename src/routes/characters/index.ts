import Router from '@koa/router';

import { getAllCharacterIdsHandler } from './getAllCharacterIds';
import { getCharactersByIdHandler } from './getCharactersById';

export const characterRouter = new Router()
  .get('/', getAllCharacterIdsHandler)
  .get('/:id', getCharactersByIdHandler);
