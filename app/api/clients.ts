import config from './config';
import { IGClient } from './models';

export const igClient = new IGClient(config.igApi.key);
