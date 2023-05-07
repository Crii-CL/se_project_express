const router = require("express").Router();
let { users } = require("./index");

router.get("/", getUser);
router.post("/", createUser);

module.exports = router;
