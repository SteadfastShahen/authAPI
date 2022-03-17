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

    type resetObject {
        resetLink: String
    }

    type messageObject {
        message: String
    }
    
    type Query { 
        getAllUsers: [ User! ]! @isAuthenticated
    }

    type Mutation {
        registerUser ( name: String!, email: String!, password: String!, confirmPass: String! ): User 
        confirmUser ( token: String ): User
        loginUser ( email: String, password: String ): tokenObject
        forgotPassword ( email: String ): resetObject
        resetPassword ( resetLink: String, newPass: String ): messageObject
    }

`

export{
    typeDefs
}