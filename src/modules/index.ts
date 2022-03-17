import { createApplication } from 'graphql-modules'
import { forgetPassModule } from './forgetPass'
import { userModule } from './user'

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [ userModule, forgetPassModule ]
})

// This is your actual GraphQL schema
const mySchema = application.schema

export {
    application
}