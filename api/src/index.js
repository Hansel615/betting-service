/* eslint-disable no-console */
const {
  port, env, host,
} = require('./config/vars');
const app = require('./config/express');

console.time('app-start');
const server = app.listen(port, () => {
  console.info(`--- Started ${env} on ${host}:${port} ---`);
  console.timeEnd('app-start');
});

module.exports = server;
