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

router.get("/:itemId", authorization, getClothingItem);
router.get("/", getClothingItems);
router.post("/", authorization, createClothingItem);
router.put("/:itemId/likes", authorization, likeItem);
router.delete("/:itemId/likes", authorization, dislikeItem);
router.delete("/:itemId", authorization, removeClothingItem);

module.exports = router;
