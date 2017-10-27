const express = require('express');
const app = express();

const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const authJwtMiddleware = require('./auth/auth-jwt-middleware');
const errorHandler = require('./error-middleware');

// Connect to database
mongoose.connect(config.db.url + config.db.name, {
	user: config.db.user,
	pass: config.db.password,
	useMongoClient: true
});

// Add middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/user', authJwtMiddleware, require('./user/user-routes'));
app.use('/auth', require('./auth/auth-routes'));

// Add error handler
app.use(errorHandler);

module.exports = app;
