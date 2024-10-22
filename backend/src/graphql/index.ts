import { typeDefs } from './typeDefs';
import { orderResolvers } from './resolvers/orderResolvers';

export const resolvers = {
    Query: {
        ...orderResolvers.Query,
    },
    Mutation: {
        ...orderResolvers.Mutation,
    }
};

export { typeDefs };