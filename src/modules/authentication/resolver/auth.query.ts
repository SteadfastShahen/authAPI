import createError from 'http-errors'
import { getUserProvider } from '../provider/auth.provider'

const queries = {
Query: {
        async getAllUsers ( parent: any, args: any, context: any, info: any ) {
            try {
                const users = await getUserProvider()

                return users.map (r => ({ ...r._doc }))

            } catch ( err: any ) {
                return createError( 400, err.message )
            }
        }
    }
}

export {
    queries
}