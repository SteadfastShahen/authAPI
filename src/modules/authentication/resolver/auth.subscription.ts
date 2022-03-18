import createError from 'http-errors'
import {  } from '../../../helper'


const subscriptions = {
    Subscription: {
        async notifyChange ( parent: any, args: any, context: any, info: any ) {
            try {
                const { email } = args

                // return await forgotPasswordService( email )
                
            } catch(err: any) {
                throw createError( 400, err.message )
            }
        }
    }
}

export {
    subscriptions
}