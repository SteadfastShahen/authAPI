import { join } from 'path';
import { ChangeStreamDocument } from 'mongodb';
import { generate } from 'text-to-image'; 
import { UserDocument } from '../models/User'

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
        
    }
}

const subscriptionService = () => {
    return { msg: 'Your name was changed and the image was generated' }
}

export {
    generateImage,
    subscriptionService
}