import { Router } from 'express';
import UserController from '../controllers/user/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

const userController = new UserController();

router.get('/', userController.getAll);
router.get('/profile', auth(), userController.getProfile);
router.patch('/profile', auth(), userController.updateProfile);
router.get('/:id', auth(), userController.get);
router.patch('/:id', auth(), userController.update);
router.delete('/:id', auth(), userController.delete);

export default router;
