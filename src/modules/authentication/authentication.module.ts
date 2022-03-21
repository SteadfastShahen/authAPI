import { createModule } from 'graphql-modules'
import { subscriptions } from './resolver/auth.subscription'
import { mutations } from './resolver/auth.mutation'
import { queries } from './resolver/auth.query'
import { loadFilesSync } from '@graphql-tools/load-files'

const authModule = createModule({
    id: 'auth-module',
    dirname: __dirname,
    typeDefs: loadFilesSync('/home/sfast/Desktop/authentication/src/modules/authentication/schema/*.graphql'),
    resolvers: [ queries, mutations, subscriptions ]
})

export{
    authModule
}