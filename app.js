const express = require('express');
const app = express();

// Routes
const web = require('./routes/web');
const api = require('./routes/api');
app.use('/', web);
app.use('/api', api);

module.exports = app;
