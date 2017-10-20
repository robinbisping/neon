const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

// Load configuration
const config = require('./config/config')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to database
const mongoose = require('mongoose')
mongoose.connect(config.db.mongo.url + config.db.mongo.name, {
	user: config.db.mongo.user,
	pass: config.db.mongo.password,
	useMongoClient: true,
})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Use passport for authentication
const passport = require('passport')
const authController = require('./controllers/auth')
app.use(passport.initialize())

// Routes
const web = require('./routes/web')
const api = require('./routes/api')
app.use('/', web)
app.use('/api', api)

// Error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.json(err)
})

module.exports = app
