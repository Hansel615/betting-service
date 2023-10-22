const cluster = require('cluster');
const axios = require('axios');
const queue = require('./config/queue');
const { apiHost } = require('./config/vars');

const numWorkers = process.argv[2];
if (cluster.isMaster) {
  // eslint-disable-next-line no-console
  console.info(`Master will fork ${numWorkers} workers`);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    // eslint-disable-next-line no-console
    console.info(`worker ${worker.process.pid} died`);
  });
} else {
  queue.process(async ({ data }, jobDone) => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * (500 - 300)));
    const [cid, mid, idx] = data.id.split(':');
    await axios.post(`${apiHost}/job`, {
      command: 'processed',
      idx,
      cid,
      mid,
    });
    jobDone();
  });
}
