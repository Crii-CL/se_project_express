const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    validate: {
      validator(v) {
        return /(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\d]/.test(v);
      },
      message: "You must enter a valid password",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
