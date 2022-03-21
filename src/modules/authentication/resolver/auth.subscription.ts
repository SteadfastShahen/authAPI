import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const subscriptions = {
    Subscription: {
        nameChanged: {
          subscribe: () => pubsub.asyncIterator(["NAME_CHANGED"]),
        },
    }
}

export {
    subscriptions
}