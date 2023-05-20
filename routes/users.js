const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.patch("/users/me");
router.patch("/users/me");
router.patch("/users/me");
router.patch("/users/me");

module.exports = router;
