const router = require("express").Router();
const clothingItems = require("./clothingItems");
const users = require("./users");
const error = require("../utils/errors");
const { createUser, userLogin } = require("../controllers/users");
const { authorization } = require("../middlewares/auth");
const { celebrate, Joi } = require("celebrate");
const { validateUser } = require("../middlewares/validation");
const { NotFoundError } = require("../middlewares/errorHandler");

router.use("/items", clothingItems);
router.use("/users", authorization, users);

router.post(
  "/signin",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required(),
        password: Joi.string().required().min(5),
      })
      .unknown(true),
  }),
  userLogin
);
router.post("/signup", validateUser, createUser);

router.use("*", (req, res) => {
  throw new NotFoundError("Requested resource was not found");
});

module.exports = router;
