import createError from 'http-errors'
import { registerUserProvider, confirmUserProvider, loginUserProvider, forgotPasswordProvider, resetPasswordProvider } from '../provider/auth.provider'

const mutations = {
    Mutation: {
        async registerUser ( parent: any, args: any, context: any, info: any ) {
            try {
                const { name, email, password, confirmPass } = args

                const registeredUser = await registerUserProvider( name, email, password, confirmPass )

                return { ...registeredUser._doc }

            } catch ( err: any ) {
                return createError( 400, err.message )
            }
        },
        async confirmUser ( parent: any, args: any, context: any, info: any ) {
            try {
                const { token } = args

                return await confirmUserProvider( token )
                
            } catch(err: any) {
                throw createError( 400, err.message )
            }
        },
        async loginUser ( parent: any, args: any, context: any, info: any ) {
            try {
                const { email, password } = args

                return await loginUserProvider( email, password )
                
            } catch(err: any) {
                throw createError( 400, err.message )
            }
        },
        async forgotPassword ( parent: any, args: any, context: any, info: any ) {
            try {
                const { email } = args

                return await forgotPasswordProvider( email )
                
            } catch(err: any) {
                throw createError( 400, err.message )
            }
        },
        async resetPassword ( parent: any, args: any, context: any, info: any ) {
            try {
                const { resetLink, newPass } = args

                return await resetPasswordProvider( resetLink, newPass )
                
            } catch( err: any ) {
                throw createError( 400, err.message )
            }
        }
    }
}

export {
    mutations
}