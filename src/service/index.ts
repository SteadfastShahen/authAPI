import { genSalt, hash, compare } from 'bcrypt';
import { User } from '../models/User';
import { sign, verify } from 'jsonwebtoken';
import UIMessages from '../helper/messages';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.API_KEY as string);

const createError = require('http-errors');

const getUserService = async() => {
    try{
        const users = await User.find()
        return users
    } catch(err: any){
        let error = createError(400, err.message)
        throw error
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
            
            const currUserId: any = await User.findOne({ email: email },{ _id: 1 });
            const secret = process.env.TOKEN_CONFIRM_SECRET as string;
            const confirmToken = sign({_id: currUserId._id}, secret)

            const message = {
                to: email,
                from: {
                    name: 'Info App',
                    email: 'shahen@steadfast.tech'},
                subject: 'Confirmation token',
                text: `Welcome! Confirmation token: ${confirmToken}`,
                html: `<h1>Welcome! Confirmation token: ${confirmToken}</h1>`
            }
            sgMail.send(message)
            .then((response) => console.log('Email Sent Successfully'))
            .catch((err) => console.log(err.message))
        }
        else{
            if(emailCheck){
                let err = createError(400, UIMessages.EMAIL_EXIST)
                throw err 
            }
            else {
                let err = createError(400, UIMessages.PASS_NO_MATCH)
                throw err
            }
        }
    } catch(err: any){
        let error = createError(400, err)
        throw error
    }
}

const confirmUserService = async( token: string ) => {
    try{
        if(!token){
            let err = createError(400, UIMessages.ACCESS_DENIED)
            throw err
        }
        else{
            const secret = process.env.TOKEN_CONFIRM_SECRET as string

            interface JwtPayload {
                _id: string
            }
            const { _id } = verify(token, secret) as JwtPayload
            console.log(_id);

            await User.updateOne({ _id: _id }, { $set: { verified: true } })
        }
    }catch(err: any){
        let error = createError(400, err.message)
        throw error
    }
}

const loginUserService = async( email: string, password: string ) => {
    try{
        const currentUser = await User.findOne({ email: email })
        if(!currentUser) 
            throw new Error( UIMessages.EMAIL_NOT_REG )
            
        const passValidation = await compare( password, currentUser.password )
        
        if(!passValidation)
            throw new Error( UIMessages.INVALID_PASS )
        
        //change token secret from .env
        const secret = process.env.TOKEN_SECRET as string;
        const userToken = sign({_id: currentUser._id}, secret)

        return { token: userToken };
    } catch(err: any){
        let error = createError(400, err.message)
        throw error
    }
}


export {
    getUserService,
    registerUserService,
    confirmUserService,
    loginUserService
}