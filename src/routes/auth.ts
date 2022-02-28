import mongoose from 'mongoose';
import {registerUserController} from '../controllers/user'
import express, { Express, Request, Response, Router } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcrypt';

const authRouter = express.Router();

authRouter.get('/users', async (req: Request, res: Response) => {

    const users = await User.find()
    res.send(users)
});


authRouter.post('/register1', registerUserController);

authRouter.post('/register', async (req: Request, res: Response)=>{
    const currentUser = new User({
        "name": req.body.name,
        "email": req.body.email
    });
    try{
        await currentUser.save()
        res.send('Successfully registered')
    } catch(err){
        res.status(400).send(err)
    }
});

authRouter.get('/login', (req: Request, res: Response)=>{
    res.send('<h1>Login screen</h1>')
});

export {
     authRouter,
};