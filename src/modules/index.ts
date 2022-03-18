import { createApplication } from 'graphql-modules'
import { authModule } from './authentication/authentication.module'

const application = createApplication({
  modules: [ authModule ]
})

export {
    application
}