const ClothingItem = require("../models/clothingItem");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch(() => res.status(500).send({ message: "error" }));
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, image } = req.body;

  if (!name || !weather || !image) {
    res.status(400).send({ message: "Please fill out remaining fields" });
  }

  ClothingItem.create({ name, weather, image })
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(500).send({ message: "error" }));
};

module.exports.removeClothingItem = (req, res) => {
  ClothingItem.findById;
};
