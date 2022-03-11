import { verify } from 'jsonwebtoken'
import { JwtPayloadId } from '../helper'
import { User } from '../models/User'

const authDirective = async ( userToken: string ) => {

    const secret = process.env.TOKEN_SECRET as string

    const { _id: tokenId } = verify( userToken, secret ) as JwtPayloadId

    if( !await User.findOne({ _id: tokenId } ) ) {

        return false
        
    }
    return true
}

export {
    authDirective
}