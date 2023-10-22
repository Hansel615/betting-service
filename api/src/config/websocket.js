const { WebSocketServer } = require('ws');
const uniqid = require('uniqid');
const queue = require('./queue');
const { webSocketPort } = require('./vars');

const sockets = new Map();

const wss = new WebSocketServer({ port: webSocketPort });

wss.on('connection', (ws) => {
  const socketId = uniqid();
  sockets.set(socketId, ws);
  // eslint-disable-next-line no-param-reassign
  ws.socketId = socketId;
  ws.on('message', async (msg) => {
    try {
      const job = JSON.parse(msg);
      const identifiers = Array.from({ length: job.count }, (_, i) => `${socketId}:${job.mid}:${i + 1}`);
      await Promise.all(identifiers.map((id) => queue.add({ id })));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error processing WebSocket message:', error);
    }
  });

  ws.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.error(`WebSocket error on socket ${ws.socketId}:`, error);
    ws.close();
  });
});

module.exports = sockets;
