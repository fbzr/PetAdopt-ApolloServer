const User = require("../models/User");

const findById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("There was a problem with findById on User's controller");
  }
};

const find = async (filter) => {
  try {
    const user = await User.findOne(filter);
    return user;
  } catch (error) {
    throw new Error(
      "There was an error with findOne method on User's find operation",
    );
  }
};

const findOrCreate = async (obj) => {
  let user;
  try {
    user = await User.findOne(obj);
  } catch (error) {
    throw new Error(
      "There was an error with the findOne method on User's findOrCreate",
    );
  }

  if (!user) {
    try {
      user = new User(obj);
      user.save();
    } catch (error) {
      throw new Error(
        "There was an error creating a new User on User's findOrCreate",
      );
    }
  }

  return user;
};

const getLikes = async (id) => {
  try {
    const user = await User.findById(id);
    return user.likes || [];
  } catch (error) {
    throw new Error("Invalid user");
  }
};

const toggleLike = async (animalId, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error();

    const index = user.likes.indexOf(animalId);
    index === -1 ? user.likes.push(animalId) : user.likes.splice(index, 1);

    user.save();
    return index === -1; // return true if liked and false if disliked
  } catch (error) {
    throw new Error("Invalid user ID");
  }
};

const remove = async (filter) => {};

module.exports = {
  findById,
  find,
  findOrCreate,
  remove,
  getLikes,
  toggleLike,
};
