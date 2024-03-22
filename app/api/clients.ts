import { Resend } from 'resend';
import config from './config';
import { IGClient } from './models/IGClient';
import { RajaClient } from './models/RajaClient';
const {
  igApi,
  smmRajaApi
} = config;

export const igClient = new IGClient(igApi.key);
export const rajaClient = new RajaClient(smmRajaApi.key);
export const resendClient = new Resend(config.resend.key);
