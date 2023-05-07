const User = require("../models/user");

module.exports.getUser = (req, res) => {
  User.create(
    (req, res)
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: "error" }))
  );
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create(req, res)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "error" }));
};
