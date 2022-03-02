import { Request, Response } from 'express';
import { getUserService, registerUserService, loginUserService } from '../service';
import ErrorMessages from '../helper/errors';

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

        res.send({ msg: ErrorMessages.SUCCESS_REG })
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
    loginUserController
}