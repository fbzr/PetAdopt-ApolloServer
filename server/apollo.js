const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      return { user };
    } else {
      throw new AuthenticationError("Authentication required");
    }
  },
  playground:
    process.env.NODE_ENV === "production"
      ? false
      : {
          // to be able to access req properties in context function
          settings: {
            "request.credentials": "include",
          },
        },
});

module.exports = apolloServer;
