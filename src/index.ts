import '../env'
import { ApolloServer } from 'apollo-server'
import { connect } from 'mongoose'
import { authDirectiveTransformer } from './directives'
import { generateImage } from './helper'
import { application } from './modules'
import { User } from './models/User'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

connect( 'mongodb://localhost:27017/users-db', { useNewUrlParser: true }, () => {
    console.log('Successfully connected to db' )
});

User.watch({ fullDocument: 'updateLookup' }).on( 'change', generateImage )

const PORT =  process.env.PORT || 3000;

let schema = application.createSchemaForApollo()

schema = authDirectiveTransformer( schema, 'isAuthenticated' )

const app = new ApolloServer({ 
    schema,
    context: ({ req }) => {
        const userToken = req.headers.authorization 
        return { pubsub, userToken }
    } 
})

app.listen( PORT, () => console.log( `server running on port ${PORT}`) )