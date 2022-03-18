import { createModule } from 'graphql-modules'
import { mutations } from './resolver/auth.mutation'
import { queries } from './resolver/auth.query'
import { mergeTypeDefs } from '@graphql-tools/merge'
// import { importSchema } from 'graphql-import'
import assert from 'assert'
import { print } from 'graphql'
import { readFileSync } from 'fs'
import { gql } from 'apollo-server'
import { type } from 'os'

let queryTypeDefs = readFileSync(require.resolve('/home/sfast/Desktop/authentication/src/modules/authentication/schema/auth.mutation.graphql'), 'utf8')

let mutationTypeDefs = readFileSync(require.resolve('/home/sfast/Desktop/authentication/src/modules/authentication/schema/auth.mutation.graphql'), 'utf8')

let typeDefs = gql( mergeTypeDefs([queryTypeDefs, mutationTypeDefs]) );
// console.log(typeDefs)

console.log(typeDefs)

// typeDefs = gql(typeDefs);

const resolvers = {
    queries,
    mutations
}

const authModule = createModule({
    id: 'auth-module',
    dirname: __dirname,
    typeDefs,
    resolvers
})

export{
    authModule
}