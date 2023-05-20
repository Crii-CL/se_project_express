const router = require("express").Router();
const { getUser } = require("../controllers/users");

router.get("/users/me", getUser);
router.patch("/users/me");
router.patch("/users/me");
router.patch("/users/me");
router.patch("/users/me");

module.exports = router;
