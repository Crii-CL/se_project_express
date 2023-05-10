const errors = require("./utils/errors");

module.exports = (err, req, res, next) => {
  if (err) {
    console.error(err);
    let serverStatus = errors.SERVER_ERROR;
    let message = "An error has occurred on the server.";

    if (err.name === "ValidationError" || err.name === "CastError") {
      serverStatus = errors.BAD_REQUEST;
      message = "Invalid data passed to the method(s).";
    } else if (err.name === "NotFound") {
      serverStatus = errors.NOT_FOUND;
      message = "Item not found.";
    }

    return res.status(serverStatus).json({ message });
  }

  next();
};
