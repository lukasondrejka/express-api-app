import { Router } from 'express';
import LoginController from '../controllers/auth/login.controller';
import PasswordResetController from '../controllers/auth/password-reset.controller';
import RegistrationController from '../controllers/auth/registration.controller';

const router = Router();

const loginController = new LoginController();
const passwordResetController = new PasswordResetController();
const registrationController = new RegistrationController();

router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/registration', registrationController.registration);
router.post('/activation', registrationController.activation);
router.get('/activation', registrationController.activation);
router.post('/password-reset-request', passwordResetController.passwordResetRequest);
router.post('/password-reset', passwordResetController.passwordReset);

export default router;
