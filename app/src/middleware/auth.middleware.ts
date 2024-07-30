import { JwtUserPayload, verify } from '../helpers/jwt.helper';
import { handleError } from '../helpers/response.helper';
import Token from '../models/token.model';
import User from '../models/user.model';
import { NextFunction, Request, Response, Status } from '../types';

/**
 * Authentication middleware
 *
 * @param role User role (admin or user)
 * @returns {Function} Express middleware
 */
export const auth = (role: 'user' | 'admin' = 'user') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const tokenString = req.headers?.authorization?.toString().split(' ')[1];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const payload: JwtUserPayload | null = verify(tokenString!);

    // Check if token is valid
    if (!payload) {
      return handleError(res, Status.UNAUTHORIZED, 'Invalid or missing token');
    }

    if (!(await Token.findOne({ where: { userId: payload.id, token: tokenString, type: 'login' } }))) {
      // Delete all expired tokens
      await Token.scope('expired').destroy({ force: true });

      return handleError(res, Status.UNAUTHORIZED, 'Expired token');
    }

    req.user = await User.findOne({ where: { id: payload.id } });

    if (role === 'admin' && !req.user?.isAdmin) {
      // User is not admin
      return handleError(res, Status.FORBIDDEN, 'Permission denied');
    }

    return next();
  };
};
