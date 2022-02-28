import { model } from 'mongoose';
import express, { Express, Request, Response, Router } from 'express';
import { User } from '../models/User';

const authRouter = express.Router();

authRouter.get('/register', (req: Request, res: Response)=>{

    const users = 
    res.send('<h1>Registration screen</h1>')
});

authRouter.get('/login', (req: Request, res: Response)=>{
    res.send('<h1>Login screen</h1>')
});

export {
     authRouter,
};