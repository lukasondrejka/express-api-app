/**
 * App configuration
 */

import { Secret, SignOptions } from 'jsonwebtoken';
import process from 'node:process';

// App
export const port: number = parseInt(process.env.PORT || '8000');
export const environment: string = process.env.NODE_ENV || 'development';
export const appName: string = process.env.APP_NAME || 'app';
export const requireVerification: boolean = process.env.REQUIRE_VERIFICATION === 'true';

// Admin user
export const adminUser = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

// JWT
export const jwtOptions = {
  key: <Secret>process.env.JWT_KEY || '',
  signOptions: <SignOptions & { expiresIn: number }>{
    expiresIn: 24 * 60 * 60, // 1d
    algorithm: 'HS256',
  },
};

const appConfig = { appName, port, environment, adminUser, jwtOptions };

export default appConfig;
