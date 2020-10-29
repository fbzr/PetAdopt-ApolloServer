const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  # queries
  type Query {
    getUser(): User!
    getLikedAnimals(): [String]! # array of animal ids
  }

  # mutations
  type Mutation {
    toggleLike(animalId: String!): Boolean! # true if liked, false if disliked
  }
`;

module.exports = typeDefs;
