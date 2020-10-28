const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  # queries
  type Query {
    getLikedAnimals(userId: ID!): [String]! # array of animal ids
  }

  # mutations
  type Mutation {
    toggleLike(animalId: String!, userId: ID!): Boolean! # true if liked, false if disliked
  }
`;

module.exports = typeDefs;
