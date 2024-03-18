import config from './config';
import { IGClient } from './models/IGClient';
import { RajaClient } from './models/RajaClient';
import { createClient } from 'next-sanity';
const {
  igApi,
  smmRajaApi,
  sanityCms: { apiVersion, dataset, projectId },
} = config;

export const igClient = new IGClient(igApi.key);
export const rajaClient = new RajaClient(smmRajaApi.key);
export const sanityClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
});
