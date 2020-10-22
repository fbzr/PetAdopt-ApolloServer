const { Schema, model } = require("mongoose");

const LikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  animalId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Like = model("like", LikeSchema);
