const router = require("express").Router();
const clothingItems = require("./clothingItems");
const users = require("./users");
const error = require("../utils/errors");
const { createUser, userLogin } = require("../controllers/users");
const { authorization } = require("../middlewares/auth");

router.use("/items", clothingItems);
router.use("/users", users, authorization);
router.post("/signin", userLogin);
router.post("/signup", createUser);

// router.use("*", (req, res) => {
//   res.status(error.NOT_FOUND).send({ message: "Requested resource not found" });
// });

router.use("*", (req, res) => {
  res.status(error.NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
