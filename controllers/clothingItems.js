const ClothingItem = require("../models/clothingItem");
const error = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = 404;
      throw err;
    })
    .then((items) => res.send({ data: items }))
    // .catch(() => res.status(404).send({ message: "Item not found" }));
    .catch((err) => res.send({ message: "Item not found" }));
};

module.exports.createClothingItem = (req, res, err, next) => {
  console.log(req.user._id);
  console.error(err);
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res
      .status(400)
      .send({ message: "Please fill out remaining fields" });
  }

  ClothingItem.create({ name, weather, imageUrl })
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
      // if (!item) {
      //   return res.status(404).send({ message: "Item not found" });
      // }
      res.send({ message: "Item removed" });
    })
    .catch((err) => next(err));
};

module.exports.likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

module.exports.dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
