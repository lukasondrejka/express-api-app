import * as crypto from 'crypto';
import translations from '../../configs/translations.config';
import { sendMailFromTemplate } from '../../helpers/email.helper';
import { handleCatch, handleError, handleResponse } from '../../helpers/response.helper';
import Token from '../../models/token.model';
import User from '../../models/user.model';
import { Request, Response, Status } from '../../types';

export default class PasswordResetController {
  public async passwordResetRequest(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.body.email.toLowerCase();

      // Find user with same email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return handleError(res, Status.NOT_FOUND, 'User with this email does not exist');
      }

      // Create password reset token
      const token = await Token.create({
        type: 'password-reset',
        userId: user!.id,
        token: crypto.randomBytes(32).toString('hex'),
      });

      const baseUrl = 'http://localhost';

      await sendMailFromTemplate('password-reset', user!.email, translations.en.email.passwordReset, {
        passwordResetUrl: `${baseUrl}/password-reset/token=${token.token}&email=${user!.email}`,
      });

      return handleResponse(res, Status.OK);
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async passwordReset(req: Request, res: Response): Promise<Response> {
    try {
      const { email, token: passwordResetToken, password } = req.body;

      const token = await Token.findOne({
        where: {
          type: 'password-reset',
          token: passwordResetToken,
        },
      });

      if (!token) {
        return handleError(res, Status.NOT_FOUND, 'Missing or invalid token');
      }

      await User.scope('withPassword').update(<object>{ password }, { where: { email } });

      await token.destroy({ force: true });

      return handleResponse(res, Status.OK);
    } catch (e) {
      return handleCatch(res, e);
    }
  }
}
