import { withFilter } from "graphql-subscriptions"
import { userSearcher } from "../../../helper"
import { pubsub } from "../../.."

const subscriptions = {
  Subscription: {
    nameChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("NAME_CHANGED"),
        async (payload, variables) => {
          const currUsr = await userSearcher(variables.userKey)
          const changeUsr = payload.nameChanged.changeKey.toString()
          return currUsr === changeUsr
        }
      ),
    },
  },
};

export { 
  subscriptions 
}
