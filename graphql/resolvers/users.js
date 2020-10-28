const userController = require("../../data/controllers/User");

module.exports = {
  Query: {
    getLikedAnimals: async (_, { userId }, context) => {
      const likes = await userController.getLikes(userId);
      return likes;
    },
  },
  Mutation: {
    toggleLike: async (_, { animalId, userId }, context) => {
      return await userController.toggleLike(animalId, userId);
    },
  },
};
