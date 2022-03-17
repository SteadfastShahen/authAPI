import { createModule, gql } from 'graphql-modules'
import { typeDefs } from './forgetPassSchema'
import { mutations } from './forgetPassResolver'

const forgetPassModule = createModule({
    id: 'forget-pass-module',
    dirname: __dirname,
    typeDefs,
    resolvers: {
      Mutation: mutations.Mutation
    }
})

export{
    forgetPassModule
}