import { join } from 'path';
import { ChangeStreamDocument } from 'mongodb'
import { PubSub } from 'graphql-subscriptions'
import { generate } from 'text-to-image';
import { UserDocument } from '../models/User'


const pubsub = new PubSub()

const generateImage = async ( change: ChangeStreamDocument<UserDocument> ) => {
    if ( change.updateDescription?.updatedFields.name ) {
        const newName: string = change.updateDescription?.updatedFields.name

        pubsub.publish('NAME_CHANGED', { nameChanged: 'Changed' }); 

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