import { getCharacterById } from 'src/services/marvel';
import { Middleware } from 'src/types/koa';
import { CharacterResponse } from 'src/types/marvel';
import { characterIdPathSchema } from 'src/types/schema';

const massageResponse = (input: CharacterResponse) => {
  const {
    data: { results }
  } = input;
  const [{ id, name, description }] = results;

  return {
    id,
    name,
    description
  };
};

export const getCharactersByIdHandler: Middleware = async (ctx) => {
  const { id } = characterIdPathSchema.validateSync(ctx.params);

  const result = await getCharacterById(id);

  ctx.body = massageResponse(result);
};
