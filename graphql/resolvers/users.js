module.exports = {
  Query: {
    getLikedAnimals: async (_, { userId }, context) => {
      console.log("context user\n", context.user);
      return [];
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      return null;
    },
    toggleLike: async (_, { animalId, userId }, context) => {
      return false;
    },
  },
};
