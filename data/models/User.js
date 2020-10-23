const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  facebookId: {
    type: String,
    required: false,
    index: true,
    unique: true,
  },
  googleId: {
    type: String,
    required: false,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: [String], // array of animals' IDs
    required: true,
    default: [],
  },
});

module.exports = User = model("user", UserSchema);
