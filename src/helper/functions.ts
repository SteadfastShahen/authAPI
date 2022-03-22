import { join } from 'path';
import { ChangeStreamDocument } from 'mongodb'
import { generate } from 'text-to-image';
import { verify } from 'jsonwebtoken'
import createError from 'http-errors'
import { JwtPayloadId, JWT_AUTH, INVALID_TOKEN, NO_AUTH } from '../helper'
import { User, UserDocument } from '../models/User'
import { pubsub } from '..';

const generateImage = async ( change: ChangeStreamDocument<UserDocument> ) => {
    
    if ( change.updateDescription?.updatedFields.name ) {
        const newName: string = change.updateDescription?.updatedFields.name

        await generate( newName, {
            fontFamily: 'Arial',
            bgColor: 'white',
            textColor: 'black',
            debug: true,
            debugFilename: join( 'images', `${newName}.png` ),
        })
        
        pubsub.publish( "NAME_CHANGED", { nameChanged: { changeKey: change.documentKey?._id } })

    }
}

const userSearcher = async ( token: string ) => {
    if ( !token ) {
        throw createError( 400, JWT_AUTH );
    }
    try {
        const { _id } = verify( token, process.env.TOKEN_SECRET as string ) as JwtPayloadId;
        const currUser = await User.findOne({ _id })
        if( !currUser )
            throw createError( 400, INVALID_TOKEN)
        return _id;
    } catch (err) {
        throw createError( 400, NO_AUTH)
    }
}

export {
    generateImage,
    userSearcher
}