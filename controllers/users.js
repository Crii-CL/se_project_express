const User = require("../models/user");
const error = require("../utils/errors");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

module.exports.getUser = (req, res, next) => {
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

module.exports.getUsers = (req, res, next) => {
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

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findByUserCredentials({ email, password })
    .orFail(() => {
      const err = new Error(
        "Make sure that passwords are hashed before being saved to the database."
      );
      err.status = error.DUPLICATE;
      err.name = "Duplicate error";
      throw err;
    })
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
