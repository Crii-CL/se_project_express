const express = require("express");

class MovedPermanentlyError extends Error {
  constructor(message = "Resource Moved Permanently") {
    super(message);
    this.statusCode = 301;
    this.name = "MovedPermanentlyError";
  }
}

class FoundError extends Error {
  constructor(message = "Found Error") {
    super(message);
    this.statusCode = 302;
    this.name = "FoundError";
  }
}

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.statusCode = 401;
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = 403;
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

class MethodNotAllowedError extends Error {
  constructor(message = "Method Not Allowed") {
    super(message);
    this.statusCode = 405;
    this.name = "MethodNotAllowedError";
  }
}

class ConflictError extends Error {
  constructor(message = "Conflict Error") {
    super(message);
    this.statusCode = 409;
    this.name = "ConflictError";
  }
}

class NotImplementedError extends Error {
  constructor(message = "Not Implemented") {
    super(message);
    this.statusCode = 501;
    this.name = "NotImplementedError";
  }
}

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
      message = err.message;
    } else if (err instanceof FoundError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof BadRequestError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof UnauthorizedError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof ForbiddenError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof NotFoundError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof MethodNotAllowedError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof ConflictError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof NotImplementedError) {
      statusCode = err.statusCode;
      message = err.message;
    }

    res.status(statusCode).json({ message });
  }
}

const handleErrorMiddleware = (err, req, res, next) => {
  const errorHandler = new ErrorHandler();
  errorHandler.handleError(err, req, res, next);
};

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
