const User = require("../models/user");
const error = require("../utils/errors");

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const err = new Error("User not found");
      error.status = error.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const err = new Error("User not found");
      error.status = error.NOT_FOUND;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};
