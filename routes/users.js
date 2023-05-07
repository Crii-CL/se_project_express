const router = require("express").Router();
const { getUser, getUsers, createUser } = require("../controllers/users");

router.get("/users/:userId", getUser);
router.get("/users", getUsers);
router.post("/users", createUser);

router.use("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
