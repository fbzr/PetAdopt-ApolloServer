const userController = require("../../data/controllers/User");

module.exports = {
  Query: {
    getUser: (_, _, context) => context.user,
    getLikedAnimals: async (_, _, context) => {
      const likes = await userController.getLikes(context.user.id);
      return likes;
    },
  },
  Mutation: {
    toggleLike: async (_, { animalId }, context) => {
      return await userController.toggleLike(animalId, context.user.id);
    },
  },
};
