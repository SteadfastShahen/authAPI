import { Request, Response } from 'express';
import { getUserService, registerUserService, loginUserService, confirmUserService, forgotPasswordService, resetPasswordService } from '../service';
import { SUCCESS_REG, ACCESS_DENIED, VERIFIED, CONFIRM_REQUEST, PASS_RESET, PASS_CHANGED } from '../helper';

const getUserController = async ( req: Request, res: Response ) => {
    try {
        const users = await getUserService()

        res.send({ usersArr: users })
    } catch( err ) {
        res.status(400).send( err )
    }
}

const registerUserController = async ( req: Request, res: Response ) => {
    try {
        const { name, email, password, confirmPass } = req.body
        
        await registerUserService( name, email, password, confirmPass )

        res.send({ msg: SUCCESS_REG })
    } catch( err ) {
        res.status(400).send( err )
    }
}

const confirmUserController = async ( req: Request, res: Response )=>{
    try {
        const { token } = req.body
        if ( !req.header('Authorization') ) {
            res.status(400).send({ msg: ACCESS_DENIED })
        }
        else {
            const currUserToken: any = req.header( 'Authorization' )

            await confirmUserService( token, currUserToken )

            res.send({ msg: VERIFIED })
        }

    } catch( err ) {
        res.status(400).send( err )
    }
}

const loginUserController = async ( req: Request, res: Response )=>{
    try {
        const { email, password } = req.body

        const userToken = await loginUserService( email, password )

        res.json({ auth: userToken.token, msg: CONFIRM_REQUEST })
    } catch( err ) {
        res.status(400).send( err )
    }
}

const forgotPasswordController = async ( req: Request, res: Response )=>{
    try {
        const { email } = req.body

        await forgotPasswordService( email )

        res.send({ msg: PASS_RESET })

    } catch( err ) {
        res.status(400).send( err )
    }
}

const resetPasswordController = async ( req: Request, res: Response )=>{
    try {
        const { newPass } = req.body
        const { resetLink } = req.params

        await resetPasswordService( resetLink, newPass )
        
        res.send({ msg: PASS_CHANGED })
    } catch( err ) {
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