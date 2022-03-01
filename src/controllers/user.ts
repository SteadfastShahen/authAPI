import { Request, Response } from 'express';
import User from '../models/User';
import { genSalt, hash, compare } from 'bcrypt';
import { MessageClient } from "cloudmailin";
import { sign } from 'jsonwebtoken';

const getUserController = async (req: Request, res: Response)=>{
    const users = await User.find()
    res.send(users)
}

const registerUserController = async (req: Request, res: Response)=>{
    const emailCheck = await User.findOne({email: req.body.email})
    
    if(req.body.password == req.body.confirmPass && !emailCheck){
        
        const salt = await genSalt(10);
        const hashedPassword = await hash(req.body.password, salt)
        
        //waiting for the domain verification
        const currentUser = new User({
            "name": req.body.name,
            "email": req.body.email,
            "password": hashedPassword
        });
        try{
            await currentUser.save()
            const client = new MessageClient({ username: "6126dea731b2f948", apiKey: "Rpy9U9RTm9D4WGbQCPvueBoT"})
            const response = await client.sendMessage({
                "from": "Registrar <registrar@info.com>",
                "to": currentUser.email,
                "test_mode": false,
                "subject": "Hello from Test App!",
                "plain": "You registered successfully",
                "html": "<h1>Welcome!</h1>"
              });
            res.send('Successfully registered')
        } catch(err){
            res.status(400).send(err)
        }
    }
    else{
        if(emailCheck){
            res.status(400).send('Email already exists')
        }
        else{
            res.status(400).send('Passwords do not match')
        }
    }
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