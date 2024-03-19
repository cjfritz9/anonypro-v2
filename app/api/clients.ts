import config from './config';
import { IGClient } from './models/IGClient';
import { RajaClient } from './models/RajaClient';
import { createClient } from 'next-sanity';
const {
  igApi,
  smmRajaApi
} = config;

export const igClient = new IGClient(igApi.key);
export const rajaClient = new RajaClient(smmRajaApi.key);
