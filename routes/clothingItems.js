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
const {
  validateItemId,
  validateAddCard,
} = require("../middlewares/validation");

router.get("/:itemId", authorization, validateItemId, getClothingItem);
router.get("/", getClothingItems);
router.post("/", authorization, validateAddCard, createClothingItem);
router.put("/:itemId/likes", authorization, validateItemId, likeItem);
router.delete("/:itemId/likes", authorization, validateItemId, dislikeItem);
router.delete("/:itemId", authorization, validateItemId, removeClothingItem);

module.exports = router;
