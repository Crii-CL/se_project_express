const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require("../middlewares/errorHandler");
const { JWT_SECRET } = require("../utils/config");

exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
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
        throw new ConflictError("Email already exists");
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
      next(new UnauthorizedError("Unauthorized"));
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
        throw new NotFoundError("User not found");
      }
      res.send({ data: { user, message: "Username updated successfully" } });
    })
    .catch(next);
};
