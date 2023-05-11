const ClothingItem = require("../models/clothingItem");
const error = require("../utils/errors");

module.exports.getClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => next(err));
};

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then((items) => res.send({ data: items }))
    .catch((err) => next(err));
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    const err = new Error("Please fill out the remaining fields");
    err.status = error.BAD_REQUEST;
    err.name = "BadRequest";
    throw err;
  }
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((err) => next(err));
};

module.exports.removeClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      err.status = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then((item) => {
      res.send({ data: item, message: "Item removed" });
    })
    .catch((err) => next(err));
};

module.exports.likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Item not found");
      err.status = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then(() => {
      res.send({ message: "Item liked" });
    })
    .catch((err) => next(err));

module.exports.dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Item not found");
      err.status = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then(() => {
      res.send({ message: "Item disliked" });
    })
    .catch((err) => next(err));
