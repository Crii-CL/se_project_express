const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateEditUser } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateEditUser, updateUser);
module.exports = router;
