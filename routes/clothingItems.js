const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  removeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.delete("/", removeClothingItem);
