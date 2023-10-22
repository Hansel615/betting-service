const httpStatus = require('http-status');
const jobService = require('../services/job');

const notify = (req, res) => {
  jobService.notify(req.body);
  res.sendStatus(httpStatus.OK);
};

module.exports = {
  notify,
};
