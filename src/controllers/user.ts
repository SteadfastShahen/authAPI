import { Request, Response } from 'express';
import { getUserService, registerUserService, loginUserService, confirmUserService } from '../service';
import UIMessages from '../helper/messages';

const getUserController = async (req: Request, res: Response) => {
    try{
        const users = await getUserService()
        res.send( users )
    }catch(err){
        res.status(400).send( err )
    }
}

const registerUserController = async (req: Request, res: Response) => {
    try{
        const { name, email, password, confirmPass } = req.body
        
        await registerUserService( name, email, password, confirmPass )

        res.send({ msg: UIMessages.CONFIRM_REQUEST })
    }catch(err){
        res.status(400).send( err )
    }
}

const confirmUserController = async(req: Request, res: Response)=>{
    try{
        const { token } = req.body

        await confirmUserService( token )

        res.send( { msg: UIMessages.VERIFIED } )

    }catch(err){
        res.status(400).send( err )
    }
}

const loginUserController = async (req: Request, res: Response)=>{
    try{
        const { email, password } = req.body

        const userToken = await loginUserService( email, password )

        res.send( userToken )
    }catch(err){
        res.status(400).send( err )
    }
}

export {    
    getUserController,
    registerUserController,
    confirmUserController, 
    loginUserController
}