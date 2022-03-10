import '../env';
import { join } from 'path';
import express, { Express, Request, Response } from 'express';
import { ChangeStreamDocument } from 'mongodb';
import { generate } from 'text-to-image'; 
import { connect } from 'mongoose';
import { User, UserDocument } from './models/User';
import { authRouter } from './routes/auth';

connect( 'mongodb://localhost:27017/users-db', () => {
    console.log('Successfully connected to db' )
});

User.watch({ fullDocument: "updateLookup" }).on( "change", async ( change: ChangeStreamDocument<UserDocument> ) => {
    if( change.updateDescription?.updatedFields.name ){
        const newName: string = change.updateDescription?.updatedFields.name
        
        await generate( newName, {
            fontFamily: 'Arial',
            bgColor: 'white',
            textColor: 'black',
            debug: true,
            debugFilename: join('images', `${newName}.png`),
        })
        
    }
    
})

const PORT =  process.env.PORT || 3000;

const app: Express = express();

// Middlewares
app.use( express.json() );

// Routes

app.use( '/auth', authRouter );

app.listen( PORT, () => console.log(`server running on port ${PORT}`) );

