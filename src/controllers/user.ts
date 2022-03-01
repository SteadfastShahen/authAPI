import { Request, Response } from 'express';
import { User } from '../models/User';
import { genSalt, hash, compare } from 'bcrypt';
import { MessageClient } from "cloudmailin";
import { sign } from 'jsonwebtoken';
import { registerUserService } from '../service';

const getUserController = async (req: Request, res: Response) => {
    const users = await User.find()
    res.send(users)
}

const registerUserController = async (req: Request, res: Response) => {
    const { email, confirmPass, name, password } = req.body
    // await registerUserService()
    res.send('Successfully registered')
}

const loginUserController = async (req: Request, res: Response)=>{
    const currentUser = await User.findOne({email: req.body.email})
    if(!currentUser) 
        return res.status(400).send('Email is not registered')
        
    const passValidation = await compare(req.body.password, currentUser.password)
    
    if(!passValidation)
        return res.status(400).send('Invalid password')
    
    //change token secret from .env
    const userToken = sign({_id: currentUser._id}, 'asdkjbsad')

    res.send(userToken);
}

export {    
    getUserController,
    registerUserController, 
    loginUserController
}