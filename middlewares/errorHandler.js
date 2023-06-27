const express = require("express");
const app = express();
class ErrorHandler {
  constructor() {
    this.handleError = this.handleError.bind(this);
  }
  handleError(err, req, res, next) {
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
    } else if (err instanceof NotImplementedError) {
      statusCode = err.statusCode;
      message = err.message || "Not Implemented";
    }

    res.status(statusCode).json({ message });
  }
}

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

class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 501;
    this.name = "NotImplementedError";
  }
}

const handleErrorMiddleware = (err, req, res, next) => {
  const errorHandler = new ErrorHandler();
  errorHandler.handleError(err, req, res, next);
};

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

module.exports = {
  handleErrorMiddleware,
  MovedPermanentlyError,
  FoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
  NotImplementedError,
};
