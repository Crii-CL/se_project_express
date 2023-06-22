// const errors = require("../utils/errors");

const { NOTFOUND } = require("dns");

// exports.validator = (err, req, res, next) => {
//   console.error(err);
//   if (res.headersSent) {
//     return next(err);
//   }

//   if (err) {
//     let serverStatus = errors.SERVER_ERROR;
//     let message = "An error has occurred on the server.";

//     if (
//       err.name === "BadRequest" ||
//       err.name === "ValidationError" ||
//       err.name === "CastError"
//     ) {
//       serverStatus = errors.BAD_REQUEST;
//       message = err.message || "Invalid data";
//     } else if (err.name === "NotFound") {
//       serverStatus = errors.NOT_FOUND;
//       message = err.message || "Resource not found";
//     } else if (err.name === "Unauthorized") {
//       serverStatus = errors.UNAUTHORIZED;
//       message = err.message || "Unauthorized";
//     } else if (err.name === "Forbidden") {
//       serverStatus = errors.FORBIDDEN;
//       message = err.message || "Forbidden";
//     } else if (err.name === "Duplicate") {
//       serverStatus = errors.DUPLICATE;
//       message = err.messsage || "Duplicate";
//     }

//     return res.status(serverStatus).json({ message });
//   }

//   return next();
// };

class MovedPermanentlyError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 301;
    this.name = "MovedPermanentlyError";
  }
}

class FoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 302;
    this.name = "FoundError";
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

class MethodNotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 405;
    this.name = "MethodNotAllowedError";
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = "ConflictError";
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = "ServerError";
  }
}

class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 501;
    this.name = "NotImplementedError";
  }
}

class ErrorHandler {
  constructor() {
    this.handleError = this.handleError.bind(this);
  }
  handleError(err, rew, res, next) {
    console.error(err);
    if (res.headersSent) {
      return next(err);
    }
    let statusCode = 500;
    let message = "An error has occurred on the server";

    if (err instanceof MovedPermanentlyError) {
      statusCode = err.statusCode;
      message = err.message || "Moved Permanently";
    } else if (err instanceof FoundError) {
      statusCode = err.statusCode;
      message = err.message || "Found";
    } else if (err instanceof BadRequestError) {
      statusCode = err.statusCode;
      message = err.message || "Bad Request";
    } else if (err instanceof UnauthorizedError) {
      statusCode = err.statusCode;
      message = err.message || "Unauthorized";
    } else if (err instanceof ForbiddenError) {
      statusCode = err.statusCode;
      message = err.message || "Forbidden";
    } else if (err instanceof NotFoundError) {
      statusCode = err.statusCode;
      message = err.message || "Resource not found";
    } else if (err instanceof MethodNotAllowedError) {
      statusCode = err.statusCode;
      message = err.message || "Method Not Allowed";
    } else if (err instanceof ConflictError) {
      statusCode = err.statusCode;
      message = err.message || "Conflict";
    } else if (err instanceof ServerError) {
      statusCode = err.statusCode;
      message = err.message || "Server Error";
    } else if (err instanceof NotImplementedError) {
      statusCode = err.statusCode;
      message = err.message || "Not Implemented";
    }

    res.status(statusCode.json({ message }));
  }
}

const errorHandler = new ErrorHandler();
module.exports = errorHandler;
