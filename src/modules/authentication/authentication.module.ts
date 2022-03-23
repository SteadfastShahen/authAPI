import { resolve } from 'path'
import { createModule } from 'graphql-modules'
import { loadFilesSync } from '@graphql-tools/load-files'
import { subscriptions } from './resolver/auth.subscription'
import { mutations } from './resolver/auth.mutation'
import { queries } from './resolver/auth.query'

const authModule = createModule({
    id: 'auth-module',
    dirname: __dirname,
    typeDefs: loadFilesSync( resolve( __dirname, 'schema/*.graphql' ) ), 
    resolvers: [ queries, mutations, subscriptions ]
})

export {
    authModule
}