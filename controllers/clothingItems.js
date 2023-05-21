const ClothingItem = require("../models/clothingItem");
const error = require("../utils/errors");

exports.getClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then((item) => res.send({ data: item }))
    .catch(next);
};

exports.getClothingItems = (req, res, next) => {
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

exports.createClothingItem = (req, res, next) => {
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

exports.removeClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      err.status = error.NOT_FOUND;
      err.name = "NotFound";
      throw err;
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        const err = new Error("This user is not the owner of this resource");
        err.status = error.FORBIDDEN;
        err.name = "Forbidden";
        throw err;
      }
      return item.deleteOne().then(() => {
        res.send({ message: "Item removed" });
      });
    })
    .catch((err) => next(err));
};

exports.likeItem = (req, res, next) =>
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

exports.dislikeItem = (req, res, next) =>
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
