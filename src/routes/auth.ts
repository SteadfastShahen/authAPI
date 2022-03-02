import { registerUserController, getUserController, loginUserController } from '../controllers/user';
import { Router } from 'express';

const authRouter = Router();

authRouter.get('/users', getUserController);

authRouter.post('/register', registerUserController);

authRouter.post('/login', loginUserController);

export {
    authRouter,
};