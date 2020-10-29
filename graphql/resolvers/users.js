const userController = require("../../data/controllers/User");

module.exports = {
  Query: {
    getUser: (_, { id }, context) => context.user,
    getLikedAnimals: async (_, __, context) => {
      const likes = await userController.getLikes(context.user.id);
      return likes;
    },
  },
  Mutation: {
    toggleLike: async (_, __, context) => {
      return await userController.toggleLike(animalId, context.user.id);
    },
  },
};
