const User = require("../models/user");
const error = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        const err = new Error("Email already in use");
        err.status = error.BAD_REQUEST;
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

  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("User not found");
        err.status = error.NOT_FOUND;
        err.name = "NotFound";
        throw err;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateName = (req, res, next) => {
  const { name } = req.body;
  const update = { name };

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
exports.updateAvatar = (req, res, next) => {
  const { Avatar } = req.body;
  const update = { Avatar };

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
      res.send({ data: { user, message: "Avatar updated successfully" } });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateEmail = (req, res, next) => {
  const { email } = req.body;
  const update = { email };

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
      res.send({ data: { user, message: "Email updated successfully" } });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updatePassword = (req, res, next) => {
  const { password } = req.body;
  const update = { password };

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
      res.send({ data: { user, message: "Password updated successfully" } });
    })
    .catch((err) => {
      next(err);
    });
};
