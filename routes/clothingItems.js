const router = require("express").Router();
const {
  getClothingItem,
  getClothingItems,
  createClothingItem,
  removeClothingItem,
  dislikeItem,
  likeItem,
} = require("../controllers/clothingItems");
const { authorization } = require("../middlewares/auth");
const { celebrate, Joi } = require("celebrate");

router.get(
  "/:itemId",
  getClothingItem,
  authorization,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().required(),
    }),
  })
);

router.get("/", getClothingItems);
router.post("/", createClothingItem, authorization);
router.put("/:itemId/likes", likeItem, authorization);
router.delete("/:itemId/likes", dislikeItem, authorization);
router.delete("/:itemId", removeClothingItem, authorization);

module.exports = router;
