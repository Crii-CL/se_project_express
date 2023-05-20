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

router.get("/:itemId", getClothingItem, authorization);
router.get("/", getClothingItems, authorization);
router.post("/", createClothingItem, authorization);
router.put("/:itemId/likes", likeItem), authorization;
router.delete("/:itemId/likes", dislikeItem, authorization);
router.delete("/:itemId", removeClothingItem, authorization);

module.exports = router;
