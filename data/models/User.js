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
  displayName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = User = model("user", UserSchema);
