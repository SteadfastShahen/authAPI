import createError from 'http-errors'
import { getUserService, registerUserService, confirmUserService, loginUserService } from '../../service'

const queries = {
Query: {
        async getAllUsers ( parent: any, args: any, context: any, info: any ) {
            try {
                const users = await getUserService()

                return users.map (r => ({ ...r._doc }))

            } catch ( err: any ) {
                return createError( 400, err.message )
            }
        }
    }
}


const mutations = {
    Mutation: {
        async registerUser ( parent: any, args: any, context: any, info: any ) {
            try {
                const { name, email, password, confirmPass } = args

                const registeredUser = await registerUserService( name, email, password, confirmPass )

                return { ...registeredUser._doc }

            } catch ( err: any ) {
                return createError( 400, err.message )
            }
        },
        async confirmUser ( parent: any, args: any, context: any, info: any ) {
            try {
                const { token } = args

                return await confirmUserService( token )
                
            } catch(err: any) {
                throw createError( 400, err.message )
            }
        },
        async loginUser ( parent: any, args: any, context: any, info: any ) {
            try {
                const { email, password } = args

                return await loginUserService( email, password )
                
            } catch(err: any) {
                throw createError( 400, err.message )
            }
        }
    }
}

export {
    queries,
    mutations
}