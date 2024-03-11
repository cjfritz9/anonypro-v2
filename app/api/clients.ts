import config from './config';
import { IGClient } from './models/IGClient';

export const igClient = new IGClient(config.igApi.key);
