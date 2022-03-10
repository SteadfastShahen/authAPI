import { registerUserController, getUserController, loginUserController, confirmUserController, forgotPasswordController, resetPasswordController } from '../controllers/user';
import { Router } from 'express';

const authRouter = Router();

authRouter.get( '/users', getUserController );

authRouter.post( '/register', registerUserController );

authRouter.post( '/confirm', confirmUserController );

authRouter.post( '/login', loginUserController );

authRouter.post( '/forgot', forgotPasswordController );

authRouter.put( '/reset/:resetLink', resetPasswordController );

export {
    authRouter,
};