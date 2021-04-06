import { characterRouter } from 'src/routes/characters';

import { app } from '../../tools/app';
import { marvelSpy, mockData } from '../../tools/marvelApi';

describe('Router for character', () => {
  describe('GET /characters/:id', () => {
    afterEach(marvelSpy.clear);

    it('return status 400 on non id path', async () => {
      const { status } = await app(characterRouter).get('/fake');

      expect(status).toEqual(400);
    });

    it('return 200', async () => {
      marvelSpy.getCharacterById().mockResolvedValue(mockData);

      const { status, body } = await app(characterRouter).get('/123');

      expect(status).toEqual(200);
      expect(body).toEqual({ id: 1, name: 'a', description: 'fake 1' });
    });

    it('return 404', async () => {
      marvelSpy.getCharacterById().mockRejectedValue({
        response: { status: 404, data: { status: 'Not Found' } },
        isAxiosError: true
      });

      const { status } = await app(characterRouter).get('/123');

      expect(status).toEqual(404);
    });
  });

  describe('GET /characters', () => {
    afterEach(marvelSpy.clear);

    it('return 200', async () => {
      marvelSpy.getCharacters().mockResolvedValue(mockData);

      const { status, body } = await app(characterRouter).get('/');

      expect(status).toEqual(200);
      expect(body).toEqual([1, 2, 3]);
    });
  });
});
