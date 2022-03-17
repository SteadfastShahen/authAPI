import { createModule, gql } from 'graphql-modules'
import { typeDefs } from './userSchema'
import { queries, mutations } from './userResolver'

const userModule = createModule({
    id: 'user-module',
    dirname: __dirname,
    typeDefs,
    resolvers: {
        Query: queries.Query,
        Mutation: mutations.Mutation
    }
})

export{
    userModule
}