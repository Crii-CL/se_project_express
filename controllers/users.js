const User = require("../models/user");
const error = require("../utils/errors");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const err = new Error("User not found");
      err.status = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      const err = new Error("User not found");
      err.status = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((existingUser) => {
      if (existingUser) {
        const err = new Error("Email already in use");
        err.status = error.DUPLICATE;
        err.name = "Duplicate";
        throw err;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({
        name: name,
        avatar: avatar,
        email: email,
        password: hash,
      });
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findByUserCredentials({ email, password })
    .then((user) => {
      const token = jtw.sign({ _id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
