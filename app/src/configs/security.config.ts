/**
 * Security configuration
 */

import { CorsOptions } from 'cors';
import appConfig from './app.config';

// Cors security
const corsOptions: CorsOptions = {
  origin: [`http://localhost:${appConfig.port}`, 'http://localhost:*'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-Requested-With', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

const securityConfig = {
  corsOptions,
};

export default securityConfig;
