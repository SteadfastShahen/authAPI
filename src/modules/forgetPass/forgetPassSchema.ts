import { gql } from 'apollo-server'

const typeDefs = gql`

  type resetObject {
      resetLink: String
  }

  type messageObject {
      message: String
  }


  type Mutation {
      forgotPassword ( email: String ): resetObject
      resetPassword ( resetLink: String, newPass: String ): messageObject
  }

`

export {
    typeDefs
}