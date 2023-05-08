const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  removeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.delete("/:itemId", removeClothingItem);

router.use("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
