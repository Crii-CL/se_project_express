const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { UnauthorizedError } = require("../middlewares/errorHandler");

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
    select: false,
    validate: {
      validator(v) {
        return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(v);
      },
      message: "You must enter a valid password",
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("User not found");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Password does not match hash");
        }
        return user;
      });
    });
};
module.exports = mongoose.model("User", userSchema);
