const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../middlewares/errorHandler");

exports.getClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => res.send({ data: item }))
    .catch(next);
};

exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((items) => res.send({ data: items }))
    .catch(next);
};

exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    throw new BadRequestError("Please fill the remaining fields");
  }
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch(next);
};

exports.removeClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("This user is not the owner of this resource");
      }
      return item.deleteOne().then(() => {
        res.send({ message: "Item removed" });
      });
    })
    .catch(next);
};

exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch(next);
};

exports.dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch(next);
