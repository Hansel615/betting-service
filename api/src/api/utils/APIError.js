/* eslint-disable max-classes-per-file */
const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor({
    message,
    errors,
    status,
    isPublic,
    stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
    // eslint-disable-next-line no-console
    if (stack) console.error(stack);
  }
}

class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}

module.exports = APIError;
