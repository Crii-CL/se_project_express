const router = require("express").Router();
const clothingItems = require("./clothingItems");
const users = require("./users");
const error = require("../utils/errors");

router.use("/items", clothingItems);
router.use("/users", users);

router.use("*", (req, res) => {
  res.status(error.NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
