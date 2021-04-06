import { AxiosRequestConfig } from 'axios';
import md5 from 'md5';
import { CharacterResponse } from 'src/types/marvel';

import { config } from '..//config';
import { createAxios } from '../lib/axios';

const init = () => {
  const { apikey, apisecret } = config;

  const instance = createAxios({ baseURL: 'https://gateway.marvel.com/v1' });

  const generateHashParams = () => {
    const ts = Date.now();

    return {
      ts,
      hash: md5(`${ts}${apisecret}${apikey}`)
    };
  };

  return {
    get: async <T>(url: string, config?: AxiosRequestConfig) => {
      const { params = {}, ...restConfig } = config || {};

      const { data } = await instance.get<T>(url, {
        params: { apikey, ...generateHashParams(), ...params },
        ...restConfig
      });

      return data;
    }
  };
};

const axios = init();

export const getCharacters = (config: AxiosRequestConfig) =>
  axios.get<CharacterResponse>('/public/characters', config);

export const getCharacterById = async (id: number) =>
  axios.get<CharacterResponse>(`/public/characters/${id}`);
