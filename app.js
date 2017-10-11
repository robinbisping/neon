const express = require('express');
const app = express();

// Load configuration
const config = require('./config/config');

// Connect to database
const mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/neon';
mongoose.connect(config.database.mongodb.url + config.database.mongodb.name, {
    user: config.database.mongodb.user,
    pass: config.database.mongodb.password,
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
