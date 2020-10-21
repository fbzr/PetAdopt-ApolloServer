const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";

    // try to retrieve a user with the token
    // for test
    const user = {
      username: "fabricio",
    };

    // const user = getUser(token);

    // add the user to the context
    return { user };
  },
});

module.exports = apolloServer;
