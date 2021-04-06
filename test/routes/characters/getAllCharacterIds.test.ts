import {
  ALL_MARVEL_CHARACTER_ID,
  getData
} from 'src/routes/characters/getAllCharacterIds';

import { cacheSpy } from '../../tools/cache';
import { marvelSpy, mockData } from '../../tools/marvelApi';

describe('getAllCharacterIds.ts', () => {
  describe('getData', () => {
    const expected = [1, 2, 3];

    afterEach(marvelSpy.clear);

    it('get from API and set to cache', async () => {
      marvelSpy.getCharacters().mockResolvedValueOnce(mockData);

      const spyCacheSet = cacheSpy.set();

      const data = await getData();
      expect(spyCacheSet).toBeCalledWith(ALL_MARVEL_CHARACTER_ID, expected);
      expect(data).toEqual(expected);
    });

    it('get from cache', async () => {
      cacheSpy.get().mockReturnValue(expected);

      const spyMarvelApi = marvelSpy.getCharacters();

      const data = await getData();
      expect(spyMarvelApi).not.toBeCalled();
      expect(data).toEqual(expected);
    });
  });
});
