const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const error = require('../api/middlewares/error');
const { logs } = require('./vars');

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  morgan(logs),
);

// Error Handling
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = app;
