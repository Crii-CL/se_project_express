const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// const error = require("../utils/errors");
const {
  NotFoundError,
  DuplicateError,
} = require("../middlewares/validator.js");
const { JWT_SECRET } = require("../utils/config");

exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      // const err = new Error("User not found");
      // err.status = error.NOT_FOUND;
      // err.name = "NotFound";
      // throw err;
      throw new NotFoundError("User not found");
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      // const err = new Error("User not found");
      // err.status = error.NOT_FOUND;
      // err.name = "NotFound";
      // throw err;
      throw new NotFoundError("User not found");
    })
    .then((users) => res.send({ data: users }))
    .catch(next);
};

exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        // const err = new Error("Email already exists");
        // err.status = error.DUPLICATE;
        // err.name = "Duplicate";
        // throw err;
        throw new DuplicateError("Email already exists");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((createdUser) => {
      res.send({
        data: {
          name: createdUser.name,
          avatar: createdUser.avatar,
          email: createdUser.email,
        },
      });
    })
    .catch(next);
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      res.status(error.UNAUTHORIZED).send({ message: "Unauthorized" });
    });
};

exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const update = { name, avatar };

  User.findOneAndUpdate({ _id: req.user._id }, update, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        // const err = new Error("User not found");
        // err.status = error.NOT_FOUND;
        // err.name = "NotFound";
        // throw err;
        throw new NotFoundError("User not found");
      }
      res.send({ data: { user, message: "Username updated successfully" } });
    })
    .catch(next);
};
