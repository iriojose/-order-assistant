import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';
import { prisma } from './prisma/client';

const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ prisma }) });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});