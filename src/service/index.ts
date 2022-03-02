import { genSalt, hash, compare } from 'bcrypt';
import { User } from '../models/User';
import { sign } from 'jsonwebtoken';
import ErrorMessages from '../helper/errors';
//import nodemailer  from 'nodemailer';

const createError = require('http-errors');

const getUserService = async() => {
    try{
        const users = await User.find()
        return users
    } catch(err){
        throw new Error(err as string)
    }
}

const registerUserService = async ( name: string, email: string, password: string, confirmPass: string ) => {
    try {
        const emailCheck = await User.findOne({ email })

        if(password == confirmPass && !emailCheck){
            
            const salt = await genSalt(10);

            
            const hashedPassword = await hash(password, salt)

            await User.create({
                name,
                email,
                password: hashedPassword
            })
/*
            var transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    
                }
            });
            
            let mailOptions = {
                from: 'sender@outlook.com',
                to: 'shahen@steadfast.tech',
                subject: 'Successfully registered',
                text: 'Congratulations on your registration!'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
            
                console.log('Message sent: ' + info.response);
            });
*/ //Review needed
        }
        else{
            if(emailCheck){
                let err = createError(400, ErrorMessages.EMAIL_EXIST)
                throw err 
            }
            else {
                let err = createError(400, ErrorMessages.PASS_NO_MATCH)
                throw err
            }
        }
    } catch(err){
        let error = createError(400, err)
        throw error
    }
}

const loginUserService = async( email: string, password: string ) => {
    try{
        const currentUser = await User.findOne({ email: email })
        if(!currentUser) 
            throw new Error( ErrorMessages.EMAIL_NOT_REG )
            
        const passValidation = await compare( password, currentUser.password )
        
        if(!passValidation)
            throw new Error( ErrorMessages.INVALID_PASS )
        
        //change token secret from .env
        const secret = process.env.TOKEN_SECRET as string;
        const userToken = sign({_id: currentUser._id}, secret)

        return {token: userToken};
    } catch(err){
        throw new Error(err as string)
    }
}


export {
    getUserService,
    registerUserService,
    loginUserService
}