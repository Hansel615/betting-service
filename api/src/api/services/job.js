const sockets = require('../../config/websocket');

const notify = (body) => {
  const {
    idx, cid, mid,
  } = body;
  const concernedSocket = sockets.get(cid);
  concernedSocket.send(JSON.stringify({
    command: 'processed',
    result: {
      idx,
    },
    mid,
  }));
};

module.exports = {
  notify,
};
