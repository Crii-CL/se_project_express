const router = require("express").Router();
const { getUser, getUsers, createUser } = require("../controllers/users");

router.get("/:userId", getUser);
router.get("/", getUsers);
router.post("/", createUser);

router.use("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
