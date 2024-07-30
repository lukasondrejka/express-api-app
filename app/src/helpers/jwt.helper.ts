/**
 * JWT helper
 */

import jwt from 'jsonwebtoken';
import { jwtOptions } from '../configs/app.config';

export interface JwtUserPayload {
  id: number;
  email: string;
  iat?: number; // Issued At
  exp?: number; // Expiration Time
}

export function sign(payload: JwtUserPayload): { token: string; expirationAt: Date } {
  return {
    token: jwt.sign(payload, jwtOptions.key, jwtOptions.signOptions),
    expirationAt: new Date(Date.now() + <number>jwtOptions.signOptions?.expiresIn * 1000),
  };
}

export function verify(tokenString: string): JwtUserPayload | null {
  try {
    return <JwtUserPayload>jwt.verify(tokenString, jwtOptions.key);
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return null;
}
