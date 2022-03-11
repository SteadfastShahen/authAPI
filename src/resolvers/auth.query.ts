import createError from 'http-errors'
import { verify } from 'jsonwebtoken'
import { getUserService } from '../service'
import { JwtPayloadId } from '../helper'
import { User } from '../models/User'

const queries = {
Query: {
        async getAllUsers ( parent: any, args: any, context: any, info: any ) {
            try {
                // this part should become a directive

                const secret = process.env.TOKEN_SECRET as string

                const { _id: tokenId } = verify( context.userToken, secret ) as JwtPayloadId

                if( !await User.findOne({ _id: tokenId } ) ) {

                    return createError( 400, 'Authentication failed' )
                    
                }

                //

                const users = await getUserService()

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