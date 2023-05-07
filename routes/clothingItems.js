const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  removeClothingItem,
} = require("../controllers/clothingItems");

router.get("/items", getClothingItems);
router.post("/items", createClothingItem);
router.delete("/items/:itemId", removeClothingItem);
