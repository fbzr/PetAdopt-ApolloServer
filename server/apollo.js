const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: { settings: { "request.credentials": "include" } },
  context: ({ req, res }) => {
    let user;

    if (req.isAuthenticated()) {
      user = req.user;
    }

    // add the user to the context
    return { user };
  },
});

module.exports = apolloServer;
