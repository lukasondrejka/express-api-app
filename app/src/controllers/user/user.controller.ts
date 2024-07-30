import { Op } from 'sequelize';
import Sequelize from '../../helpers/database.helper';
import pagination from '../../helpers/pagination.helper';
import { handleCatch, handleError, handleResponse } from '../../helpers/response.helper';
import { validateEmail } from '../../helpers/validators.helper';
import User from '../../models/user.model';
import { Request, Response, Status } from '../../types';

export default class UserController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      let options = {};

      if (req.query.search) {
        const search = (<string>req.query.search).toLowerCase();
        options = {
          where: {
            [Op.or]: [
              Sequelize.where(Sequelize.fn('lower', Sequelize.col('firstName')), { [Op.like]: `%${search}%` }),
              Sequelize.where(Sequelize.fn('lower', Sequelize.col('lastName')), { [Op.like]: `%${search}%` }),
              Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), { [Op.like]: `%${search}%` }),
            ],
          },
        };
      }

      const users = await pagination(User, req, options, 'withoutPassword');

      return handleResponse(res, Status.OK, users);
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return handleError(res, Status.NOT_FOUND, 'User not found');
      }

      return res.status(Status.OK).send(user);
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByPk(req.user?.id);
      return handleResponse(res, Status.OK, user);
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).send();
      }

      await user.update(req.body);

      return handleResponse(res, Status.OK, user);
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      // Prevents users from changing their own admin status
      delete req.body.isAdmin;

      const user = await User.findByPk(req.user?.id);

      if (!validateEmail(req.body.email)) {
        return handleError(res, Status.BAD_REQUEST, 'Invalid email');
      }

      await user?.update(req.body);

      return handleResponse(res, Status.OK, user);
    } catch (e) {
      return handleCatch(res, e);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return handleError(res, Status.NOT_FOUND, 'User not found');
      }

      if (user.isAdmin && req.user?.id === user.id) {
        return handleError(res, Status.FORBIDDEN, 'Current admin account cannot be deleted');
      }

      await user.destroy();

      return handleResponse(res, Status.OK);
    } catch (e) {
      return handleCatch(res, e);
    }
  }
}
