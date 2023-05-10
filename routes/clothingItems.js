const router = require("express").Router();
const {
  getClothingItem,
  getClothingItems,
  createClothingItem,
  removeClothingItem,
  dislikeItem,
  likeItem,
} = require("../controllers/clothingItems");

router.get("/:itemId", getClothingItem);
router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);
router.delete("/:itemId", removeClothingItem);

module.exports = router;
