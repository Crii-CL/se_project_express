const errors = require("../utils/errors");

exports.validator = (err, req, res, next) => {
  // console.error(err);
  if (res.headersSent) {
    return next(err);
  }

  if (err) {
    let serverStatus = errors.SERVER_ERROR;
    let message = "An error has occurred on the server.";

    if (
      err.name === "BadRequest" ||
      err.name === "ValidationError" ||
      err.name === "CastError" ||
      err.name === "Duplicate"
    ) {
      serverStatus = errors.BAD_REQUEST;
      message = err.message || "Invalid data";
    } else if (err.name === "NotFound") {
      serverStatus = errors.NOT_FOUND;
      message = err.message || "Resource not found";
    } else if (err.name === "Unauthorized") {
      serverStatus = errors.UNAUTHORIZED;
      message = err.message || "Unauthorized";
    }

    return res.status(serverStatus).json({ message });
  }

  return next();
};
