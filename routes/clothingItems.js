const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  removeClothingItem,
} = require("../controllers/clothingItems");

router.get("/items", getClothingItems);
router.post("/items", createClothingItem);
router.delete("/items/:itemId", removeClothingItem);

router.use("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
