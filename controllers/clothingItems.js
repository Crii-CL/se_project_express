const ClothingItem = require("../models/clothingItem");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch(() => res.status(500).send({ message: "error" }));
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, link } = req.body;

  if (!name || !weather || !link) {
    res.status(400).send({ message: "Please fill out remaining fields" });
  }

  ClothingItem.create({ name, weather, link })
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(500).send({ message: "error" }));
};

module.exports.removeClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        res.status(404).send({ message: "Item not found" });
      }
      res.send({ message: "Item removed" });
    })
    .catch(() => res.status(500).send({ message: "error" }));
};
