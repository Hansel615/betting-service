const express = require('express');
const job = require('./job');

const router = express.Router();

router.use('/job', job);

module.exports = router;
