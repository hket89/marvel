import { characterRouter } from '../../../src/routes/characters';
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

      const result = await app(characterRouter).get('/123');

      expect(result).toMatchSnapshot();
    });

    it('return 404', async () => {
      marvelSpy
        .getCharacterById()
        .mockRejectedValue({ response: { status: 404 }, isAxiosError: true });

      const result = await app(characterRouter).get('/123');

      expect(result).toMatchSnapshot();
    });
  });

  describe('GET /characters', () => {
    afterEach(marvelSpy.clear);

    it('return 200', async () => {
      marvelSpy.getCharacters().mockResolvedValue(mockData);

      const result = await app(characterRouter).get('/');

      expect(result).toMatchSnapshot();
    });
  });
});
