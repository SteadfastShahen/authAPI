import { Request, Response } from 'express';
import { getUserService, registerUserService, loginUserService, confirmUserService, forgotPasswordService, resetPasswordService } from '../service';
import UIMessages from '../helper/messages';

const getUserController = async (req: Request, res: Response) => {
    try{
        const users = await getUserService()

        res.send({ usersArr: users })
    }catch( err ) {
        res.status(400).send( err )
    }
}

const registerUserController = async (req: Request, res: Response) => {
    try{
        const { name, email, password, confirmPass } = req.body
        
        await registerUserService( name, email, password, confirmPass )

        res.send({ msg: UIMessages.SUCCESS_REG })
    }catch( err ) {
        res.status(400).send( err )
    }
}

const confirmUserController = async (req: Request, res: Response)=>{
    try{
        const { token } = req.body
        if( !req.header('Authorization') ) {
            res.status(400).send({ msg: UIMessages.ACCESS_DENIED })
        }
        else{
            const currUserToken: any = req.header('Authorization')

            await confirmUserService( token, currUserToken )

            res.send({ msg: UIMessages.VERIFIED })
        }

    }catch( err ) {
        res.status(400).send( err )
    }
}

const loginUserController = async (req: Request, res: Response)=>{
    try{
        const { email, password } = req.body

        const userToken = await loginUserService( email, password )

        res.header( 'Authorization', userToken.token ).send({ auth: userToken.token, msg: UIMessages.CONFIRM_REQUEST })
    }catch( err ) {
        res.status(400).send( err )
    }
}

const forgotPasswordController = async (req: Request, res: Response)=>{
    try{
        const { email } = req.body

        await forgotPasswordService( email )

        res.send({ msg: UIMessages.PASS_RESET })

    }catch( err ) {
        res.status(400).send( err )
    }
}

const resetPasswordController = async (req: Request, res: Response)=>{
    try{
        const { newPass } = req.body
        const { resetLink } = req.params

        await resetPasswordService( resetLink, newPass )
        
        res.send({ msg: UIMessages.PASS_CHANGED })
    }catch( err ) {
        res.status(400).send( err )
    }
}

export {    
    getUserController,
    registerUserController,
    confirmUserController, 
    loginUserController,
    forgotPasswordController,
    resetPasswordController
}