import { queries } from "./auth.query";
import { mutations } from './auth.mutation';

const resolvers = {
    Query: queries.Query,
    Mutation: mutations.Mutation 
}

export {
    resolvers
}