import * as crypto from 'crypto';
import appConfig from '../../configs/app.config';
import translations from '../../configs/translations.config';
import { sendMailFromTemplate } from '../../helpers/email.helper';
import { handleCatch, handleError, handleResponse } from '../../helpers/response.helper';
import { validateEmail } from '../../helpers/validators.helper';
import Token from '../../models/token.model';
import User from '../../models/user.model';
import { Request, Response, Status } from '../../types';

export default class RegistrationController {
  public async registration(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, primaryLanguage } = req.body;
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      if (!validateEmail(req.body.email)) {
        return handleError(res, Status.BAD_REQUEST, 'Invalid email');
      }

      // Find user with same email
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return handleError(res, Status.CONFLICT, 'User with this email already exists');
      }

      // Create user
      let user: User | null = await User.create({
        firstName,
        lastName,
        email,
        password,
        primaryLanguage,
        status: 'inactive',
      });

      if (!user) {
        return handleError(res, Status.INTERNAL_SERVER_ERROR, 'User could not be created');
      }

      user = await User.findOne({ where: { id: user.id } });

      const token = await Token.create({
        type: 'activation',
        userId: user!.id,
        token: crypto.randomBytes(32).toString('hex'),
      });

      // Send activation email
      sendMailFromTemplate('activation', user!.email, translations.en.email.action, {
        url: `http://localhost:${appConfig.port}/api/activation?token=${token!.token}&email=${user!.email}`,
      });

      return handleResponse(res, Status.CREATED, user);
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async activation(req: Request, res: Response): Promise<Response> {
    try {
      const tokenString = req.query.token ?? req.body.token;

      if (!tokenString) {
        return handleError(res, Status.BAD_REQUEST, 'Missing activation token');
      }

      const token = await Token.findOne({
        where: {
          type: 'activation',
          token: tokenString,
        },
      });

      if (!token) {
        return handleError(res, Status.NOT_FOUND, 'Invalid activation token');
      }

      const user = await User.findOne({ where: { id: token.userId, email: req.query.email ?? req.body.email } });

      if (!user) {
        return handleError(res, Status.NOT_FOUND, 'User not found');
      }

      user!.status = 'active';

      await user!.save();

      await token!.destroy();

      return handleResponse(res, Status.OK, {});
    } catch (e) {
      return handleCatch(res, e);
    }
  }
}
