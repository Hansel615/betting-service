/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const WebSocket = require('ws');
const program = require('commander');

program
  .option('--messages <n>')
  .option('--sockets <s>')
  .option('--count <c>')
  .parse(process.argv);

const numMessages = program._optionValues.messages || 10;
const numSockets = program._optionValues.sockets || 5;
const countValue = program._optionValues.count || 1;

const apiUrl = 'ws://localhost:8080';

const sockets = [];

const sendMessages = (ws, socketId) => {
  // eslint-disable-next-line no-plusplus
  for (let mid = 1; mid <= numMessages; mid++) {
    const message = {
      command: 'enqueue',
      mid,
      count: countValue,
    };
    ws.send(JSON.stringify(message), (error) => {
      if (error) {
        console.error(`Error sending message from socket ${socketId}:`, error);
      }
    });

    if (mid === numMessages) {
      ws.isDone = true;
      console.log(`Socket ${socketId} sent all messages.`);
    }
  }
};

const createSocket = (socketId) => {
  const ws = new WebSocket(apiUrl);

  ws.on('open', () => {
    console.log(`Socket ${socketId} connected.`);
    sendMessages(ws, socketId);
  });

  ws.on('message', (message) => {
    console.log(`Received response on socket ${socketId}: ${message}`);
  });

  ws.isDone = false;
  sockets.push(ws);
};

const socketsToInitiate = Array.from({ length: numSockets }, (_, i) => i);

socketsToInitiate.forEach((socket) => createSocket(socket));
