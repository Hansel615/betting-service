/* eslint-disable no-console */
const {
  httpPort, webSocketPort, env, host,
} = require('./config/vars');
const app = require('./config/express');

require('./config/websocket');

console.info(`--- Started ${env} Websocket on ${host}:${webSocketPort} ---`);

console.time('app-start');
const server = app.listen(httpPort, () => {
  console.info(`--- Started ${env} HTTP on ${host}:${httpPort} ---`);
  console.timeEnd('app-start');
});

module.exports = server;
