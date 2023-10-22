const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const handler = (err, req, res) => {
  const response = {
    http: {
      statusCode: err.status,
      statusCategory: 'ERROR',
      url: req.url,
      method: req.method,
    },
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };
  // eslint-disable-next-line no-console
  console.error(response);
  res.sendStatus(err.status);
};

const converter = (err, req, res) => {
  let convertedError = err;
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message || 'No message',
      status: err.status || 500,
      stack: err.stack,
    });
  }
  return handler(convertedError, req, res);
};

const notFound = (req, res) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};

module.exports = {
  converter,
  handler,
  notFound,
};
