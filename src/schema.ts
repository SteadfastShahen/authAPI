import { gql } from 'apollo-server'

const typeDefs = gql`
    type User {
        name: String!
        email: String!
        verified: Boolean
        resetLink: String
    }

    type tokenObject {
        token: String
    }
    
    type Query { #@authDirective( userToken: context.userToken ) 
        getAllUsers: [ User! ]! #@auth
    }

    type Mutation {
        registerUser ( name: String!, email: String!, password: String!, confirmPass: String! ): User 
        confirmUser ( token: String ): User
        loginUser ( email: String, password: String ): tokenObject
    }

`

export{
    typeDefs
}