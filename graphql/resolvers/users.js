module.exports = {
  Query: {
    getLikedAnimals: async (_, { userId }) => {
      return [];
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      return null;
    },
    toggleLike: async (_, { animalId, userId }) => {
      return false;
    },
  },
};
