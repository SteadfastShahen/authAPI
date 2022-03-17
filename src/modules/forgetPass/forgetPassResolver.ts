import createError from 'http-errors'
import { forgotPasswordService, resetPasswordService } from '../../service'

const mutations = {
    Mutation: {
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