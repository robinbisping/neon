const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Load configuration
const config = require('./config/app');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Hide info from HTTP header
app.set('etag', false);
app.set('x-powered-by', false);

// Connect to database
const mongoose = require('mongoose');
mongoose.connect(config.database.mongo.url + config.database.mongo.name, {
	user: config.database.mongo.user,
	pass: config.database.mongo.password,
	useMongoClient: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use passport for authentication
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport');

// Routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
app.use('/user', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/auth', authRoutes);

// Error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json(err);
});

module.exports = app;
