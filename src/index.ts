import '../env';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server';
import { ChangeStreamDocument } from 'mongodb';
import { generate } from 'text-to-image'; 
import { connect } from 'mongoose';
import { authDirectiveTransformer } from './directives';
import { User, UserDocument } from './models/User';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';


connect( 'mongodb://localhost:27017/users-db', { useNewUrlParser: true }, () => {
    console.log('Successfully connected to db' )
});

User.watch({ fullDocument: 'updateLookup' }).on( 'change', async ( change: ChangeStreamDocument<UserDocument> ) => {
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
    
})

const PORT =  process.env.PORT || 3000;

let schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

schema = authDirectiveTransformer( schema, 'isAuthenticated' )

const app = new ApolloServer({ 
    schema,
    context: ({ req }) => {
        const userToken = req.headers.authorization 
        return { userToken }
    } 
})




app.listen( PORT, () => console.log( `server running on port ${PORT}`) );