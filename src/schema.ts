import { gql } from 'apollo-server'

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        verified: Boolean!
        resetLink: String!
    }

    type tokenObject {
        token: String
    }
    
    type Query {
        getAllUsers: [ User! ]! 
    }

    type Mutation {
        registerUser ( name: String, email: String, password: String, confirmPass: String ): User
        confirmUser ( token: String, currUserToken: String ): User
        loginUser ( email: String, password: String ): tokenObject
    }

`

export{
    typeDefs
}