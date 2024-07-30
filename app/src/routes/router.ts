import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';

const router = Router();
const apiRouter = Router();

// API prefix for all routes
router.use('/api', apiRouter);

// Routes
apiRouter.use('/', authRouter);
apiRouter.use('/users', userRouter);

export default router;
