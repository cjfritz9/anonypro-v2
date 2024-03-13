import config from './config';
import { IGClient } from './models/IGClient';
import { RajaClient } from './models/RajaClient';

export const igClient = new IGClient(config.igApi.key);
export const rajaClient = new RajaClient(config.smmRajaApi.key)