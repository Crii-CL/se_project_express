const mongoose = require("mongoose");
const user = require("../models/user");

const clothingItemsSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
    imageUrl: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
    },
    message: "You must enter a valid URL",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
  likes: { type: Array, required: true, ref: user },
  createdAt: { type: Date, value: Date.now },
});

module.exports = new mongoose.Schema("clothingItems", clothingItemsSchema);
