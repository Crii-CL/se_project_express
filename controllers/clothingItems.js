const ClothingItem = require("../models/clothingItem");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .orFail()
    .then((items) => res.send({ data: items }))
    .catch(() =>
      res.status(500).send({ message: "An error has occurred on the server" })
    );
};

module.exports.createClothingItem = (req, res, err) => {
  console.log(req.user._id);
  console.error(err);
  const { name, weather, link } = req.body;

  if (!name || !weather || !link) {
    return res
      .status(400)
      .send({ message: "Please fill out remaining fields" });
  }

  ClothingItem.create({ name, weather, link })
    .then((item) => res.send({ data: item }))
    .catch(() =>
      res.status(500).send({ message: "An error has occurred on the server" })
    );
};

module.exports.removeClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.send({ message: "Item removed" });
    })
    .catch(() =>
      res.status(500).send({ message: "An error has occurred on the server" })
    );
};
