const express = require('express');
const app = express();

const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config');
const authMiddleware = require('./auth/auth-middleware');
const errorHandler = require('./error-middleware');

require('./auth/passport');

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
app.use(passport.initialize());

// Routes
app.use('/user', authMiddleware.jwtAuth, require('./user/user-routes'));
app.use('/auth', require('./auth/auth-routes'));

// Add error handler
app.use(errorHandler);

module.exports = app;
