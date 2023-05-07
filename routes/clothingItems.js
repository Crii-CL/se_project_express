const router = require("express").Router();
const {
  getClothingItem,
  createClothingItem,
  removeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItem);
router.post("/", createClothingItem);
router.delete("/", removeClothingItem);
