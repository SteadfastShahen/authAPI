import '../env'
import { ApolloServer } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions';
import { connect } from 'mongoose'
import { authDirectiveTransformer } from './directives'
import { generateImage } from './helper'
import { application } from './modules'
import { User } from './models/User'

import express from 'express';

import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const PORT =  process.env.PORT || 3000;

const pubsub = new PubSub();

connect( 'mongodb://localhost:27017/users-db', { useNewUrlParser: true }, () => {
    console.log('Successfully connected to db' )
});

let schema = application.createSchemaForApollo()

schema = authDirectiveTransformer( schema, 'isAuthenticated' )

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);
  
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        const userToken = req.headers.authorization 
        return { pubsub, userToken }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
  
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

(async () => {
    await server.start()

    server.applyMiddleware({ app })
    
    
    httpServer.listen(PORT, () => {
    console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
    });
})();



User.watch({ fullDocument: 'updateLookup' }).on( 'change', generateImage )