const path = require('path');
// for local environment PLEASE DO NOT FORGET TO CREATE .env FILE
// Check .env.example to help you create it
// eslint-disable-next-line global-require
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
  allowEmptyValues: true,
});

const { env } = process;

module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  host: env.HOST,
  logs: env.LOGS,
  redisHost: env.REDIS_HOST,
  apiHost: env.API_HOST,
};
