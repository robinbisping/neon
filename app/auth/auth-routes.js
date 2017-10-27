const express = require('express');
const router = express.Router();

const authBasicMiddleware = require('./auth-basic-middleware');
const authController = require('./auth-controller');

// Authentication routes
router.route('/login')
	.all(authBasicMiddleware)
	.get(authController.login);
router.route('/register')
	.post(authController.register);

module.exports = router;
