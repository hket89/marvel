import axios, { AxiosRequestConfig } from 'axios';

export const createAxios = (config: AxiosRequestConfig) => axios.create(config);
