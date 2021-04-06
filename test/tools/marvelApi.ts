import * as marvel from 'src/services/marvel';
import { CharacterResponse } from 'src/types/marvel';

export const marvelSpy = {
  getCharacters: () => jest.spyOn(marvel, 'getCharacters'),
  getCharacterById: () => jest.spyOn(marvel, 'getCharacterById'),

  clear: () => {
    marvelSpy.getCharacters().mockRestore();
    marvelSpy.getCharacterById().mockRestore();
  }
};

export const mockData: CharacterResponse = {
  code: 200,
  status: 'Ok',
  copyright: '© 2021 MARVEL',
  attributionText: 'Data provided by Marvel. © 2021 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>',
  etag: '3c99bcca6c101cb28dd7f9255e0fb2d394d12737',
  data: {
    offset: 0,
    limit: 3,
    total: 20,
    count: 3,
    results: [
      {
        id: 1,
        name: 'a',
        description: 'fake 1'
      },
      {
        id: 2,
        name: 'b',
        description: 'fake 2'
      },
      {
        id: 3,
        name: 'c',
        description: 'fake 3'
      }
    ]
  }
};
