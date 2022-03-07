import { registerUserController, getUserController, loginUserController, confirmUserController } from '../controllers/user';
import { Router } from 'express';

const authRouter = Router();

authRouter.get('/users', getUserController);

authRouter.post('/register', registerUserController);

authRouter.post('/confirm', confirmUserController);

authRouter.post('/login', loginUserController);

export {
    authRouter,
};