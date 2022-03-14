import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import createError from 'http-errors';
import sgMail from '@sendgrid/mail';
import { registerUserMessage, forgotPassMessage, EMAIL_EXIST, PASS_NO_MATCH, ACCESS_DENIED, INVALID_OPERATION, EMAIL_NOT_REG, INVALID_PASS, INVALID_LINK, JwtPayloadEmail, JwtPayloadId } from '../helper';
import { User } from '../models/User';

sgMail.setApiKey( process.env.API_KEY as string );

const getUserService = async () => {
    try {
        const users = await User.find()
        return users
    } catch(err: any) {
        throw createError( 400, err.message )
    }
}

const registerUserService = async ( name: string, email: string, password: string, confirmPass: string ) => {
    try {
        const emailCheck = await User.findOne({ email })

        if ( password == confirmPass && !emailCheck ) {
            
            const salt = await genSalt(10);
            
            const hashedPassword = await hash( password, salt )

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            })
            
            const currUserId: any = await User.findOne({ email }, { _id: 1 });
            const secret = process.env.TOKEN_CONFIRM_SECRET as string;
            const confirmToken = sign( { _id: currUserId._id }, secret )

            const { fromName, fromEmail, subject, text, html1, html2 } = registerUserMessage

            const message = {
                to: email,
                from: {
                    name: fromName,
                    email: fromEmail},
                subject,
                text: text + confirmToken,
                html: html1 + confirmToken + html2
            }
            //await sgMail.send( message )
            return newUser
        }
        else {
            const errMsg = emailCheck ? EMAIL_EXIST : PASS_NO_MATCH
            throw createError( 400, errMsg )
        }
    } catch(err: any) {
        throw createError( 400, err )
    }
}

const confirmUserService = async ( token: string ) => {
    try {
        if (!token) {
            throw createError( 400, ACCESS_DENIED )
        }
    
        const confirmSecret = process.env.TOKEN_CONFIRM_SECRET as string

        const { _id: tokenId } = verify( token, confirmSecret ) as JwtPayloadId

        return await User.updateOne({ _id: tokenId }, { $set: { verified: true } });
        
        
    } catch(err: any) {
        throw createError( 400, err.message )
    }
}

const loginUserService = async ( email: string, password: string ) => {
    try {
        const currentUser = await User.findOne({ email })
        if ( !currentUser ) {
            throw createError( 400, EMAIL_NOT_REG )
        }
            
        const passValidation = await compare( password, currentUser.password )
        
        if ( !passValidation ) {
            throw createError( 400, INVALID_PASS )
        }
        
        const secret = process.env.TOKEN_SECRET as string;
        const userToken = sign( { _id: currentUser._id }, secret )

        return { token: userToken };
    } catch( err: any ) {
        throw createError(400, err.message)
    }
}

const forgotPasswordService = async ( email: string ) => {
    try {
        const currentUser = await User.findOne({ email })
        if ( !currentUser ) {
            throw createError( 400, EMAIL_NOT_REG )
        }

        const resetSecret = process.env.RESET_SECRET as string
        const linkFinal = sign({ email }, resetSecret)

        const { name, fromEmail, subject, text, html1, html2 } = forgotPassMessage

        const message = {
            to: email,
            from: {
                name,
                email: fromEmail},
            subject,
            text: text + linkFinal,
            html: html1 + linkFinal + html2
        }
        //await sgMail.send( message )

        await User.updateOne( { email }, { $set: { resetLink: linkFinal } })

    } catch(err: any) {
        throw createError( 400, err.message )
    }
}

const resetPasswordService = async ( resetLink: string, newPass: string ) => {
    try {
        const resetSecret = process.env.RESET_SECRET as string
        const { email } = verify( resetLink, resetSecret ) as JwtPayloadEmail

        const userToBeUpdated = User.findOne({ resetLink, email })

        if ( !userToBeUpdated ) {
            throw createError( 400, INVALID_LINK )
        }

        if ( newPass === '' ) {
            throw createError( 400, INVALID_PASS )
        }

        const salt = await genSalt( 10 );
            
        const hashedPassword = await hash( newPass, salt )

        await User.updateOne({ resetLink: resetLink, email: email }, { $set: { password: hashedPassword }})

        
    } catch(err: any) {
        throw createError( 400, err.message )
    }
}

export {
    getUserService,
    registerUserService,
    confirmUserService,
    loginUserService,
    forgotPasswordService,
    resetPasswordService
}