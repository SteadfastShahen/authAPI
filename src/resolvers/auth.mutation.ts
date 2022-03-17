import createError from 'http-errors'
import { registerUserService, confirmUserService, loginUserService, forgotPasswordService, resetPasswordService } from '../service'

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
        },
        async forgotPassword ( parent: any, args: any, context: any, info: any ) {
            try {
                const { email } = args

                return await forgotPasswordService( email )
                
            } catch(err: any) {
                throw createError( 400, err.message )
            }
        },
        async resetPassword ( parent: any, args: any, context: any, info: any ) {
            try {
                const { resetLink, newPass } = args

                return await resetPasswordService( resetLink, newPass )
                
            } catch( err: any ) {
                throw createError( 400, err.message )
            }
        }
    }
}

export {
    mutations
}