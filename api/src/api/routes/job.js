const express = require('express');
const {
  notify,
} = require('../controllers/job');

const router = express.Router();

router.route('/').post(notify);

module.exports = router;
