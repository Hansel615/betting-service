const Queue = require('bull');
const { redisHost } = require('./vars');

const queue = new Queue('work', redisHost);

module.exports = queue;
