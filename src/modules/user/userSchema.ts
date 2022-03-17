import { gql } from 'apollo-server'
const typeDefs = gql`

    directive @isAuthenticated on FIELD_DEFINITION

    type User {
        name: String!
        email: String!
        verified: Boolean
        resetLink: String
    }

    type tokenObject {
        token: String
    }
    
    type Query { 
        getAllUsers: [ User! ]! @isAuthenticated
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