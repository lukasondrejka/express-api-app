import { requireVerification } from '../../configs/app.config';
import { JwtUserPayload, sign, verify } from '../../helpers/jwt.helper';
import { handleCatch, handleError, handleResponse } from '../../helpers/response.helper';
import Token from '../../models/token.model';
import User from '../../models/user.model';
import { Request, Response, Status } from '../../types';

export default class LoginController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.body.email.toLowerCase();

      let user = await User.scope('withPassword').findOne({ where: { email } });

      // Check if user exists
      if (!user) {
        return handleError(res, Status.FORBIDDEN, 'User with this email does not exist');
      }

      // Check if user is active if verification is required
      if (requireVerification && user.status !== 'active') {
        return handleError(res, Status.FORBIDDEN, 'User is not active');
      }

      // Check password
      if (!user.verifyPassword(req.body.password)) {
        return handleError(res, Status.FORBIDDEN, 'Incorrect email or password');
      }

      // User without password
      user = await User.findByPk(user.id);

      // Generate token
      const payload: JwtUserPayload = { id: user!.id, email: user!.email };
      const tokenData = sign(payload);

      // Save token
      const token = await Token.create({
        userId: user!.id,
        token: tokenData.token,
        expirationAt: tokenData.expirationAt,
        type: 'login',
      });

      return handleResponse(res, Status.OK, {
        token: token.token,
        ...user!.toJSON(),
      });
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    try {
      const tokenString = req.headers.authorization?.split(' ')[1] || '';

      // Verify token
      const payload = verify(tokenString);

      // Delete token
      if (payload) {
        await Token.destroy({ where: { userId: payload.id, token: tokenString } });
      }

      return handleResponse(res, Status.OK);
    } catch (e) {
      return handleCatch(res, e);
    }
  }
}
