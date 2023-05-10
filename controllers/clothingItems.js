const ClothingItem = require("../models/clothingItem");
const error = require("../utils/errors");

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = error.NOT_FOUND;
      throw err;
    })
    .then((items) => res.send({ data: items }))
    .catch((err) => next(err));
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl, owner } = req.body;

  if (!name || !weather || !imageUrl || !owner) {
    const err = new Error("Please fill out the remaining fields");
    error.status = error.BAD_REQUEST;
    throw err;
  }

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((err) => next(err));
};

module.exports.removeClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      error.status = error.NOT_FOUND;
      throw err;
    })
    .then((item) => {
      res.send({ data: item, message: "Item removed" });
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
