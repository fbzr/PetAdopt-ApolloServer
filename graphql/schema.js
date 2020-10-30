const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  # queries
  type Query {
    user: User!
    likedAnimals: [String]! # array of animal ids
  }

  # mutations
  type Mutation {
    toggleLike(animalId: String!): Boolean! # true if liked, false if disliked
  }
`;

module.exports = typeDefs;
