const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Elise Bouer",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png",
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    message: "You must enter a valid URL",
    minlength: 2,
    maxlength: 30,
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
    validate: {
      validator(v) {
        return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(v);
      },
      message: "You must enter a valid password",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
