const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // add next line to be able to access req properties in context function
  // playground: { settings: { "request.credentials": "include" } },
  context: ({ req }) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      return { user };
    } else {
      throw new AuthenticationError("Authentication required");
    }
  },
});

module.exports = apolloServer;
