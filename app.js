const express = require('express');
const app = express();

// Load configuration
const config = require('./config/config');

// Connect to database
const mongoose = require('mongoose');
mongoose.connect(config.db.mongo.url + config.db.mongo.name, {
	user: config.db.mongo.user,
	pass: config.db.mongo.password,
	useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
const web = require('./routes/web');
const api = require('./routes/api');
app.use('/', web);
app.use('/api', api);

module.exports = app;
