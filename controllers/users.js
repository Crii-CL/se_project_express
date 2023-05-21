const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const error = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

exports.getCurrentUser = (req, res, next) => {
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

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const err = new Error("Email already in use");
        err.status = error.BAD_REQUEST;
        err.name = "Duplicate";
        throw err;
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
    .catch((err) => {
      next(err);
    });
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email, password })
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
        const err = new Error("User not found");
        err.status = error.NOT_FOUND;
        err.name = "NotFound";
        throw err;
      }
      res.send({ data: { user, message: "Username updated successfully" } });
    })
    .catch((err) => {
      next(err);
    });
};
