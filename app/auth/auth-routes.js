const express = require('express');
const router = express.Router();

const authMiddleware = require('./auth-middleware');
const authController = require('./auth-controller');

// Authentication routes
router.route('/login')
	.get(authMiddleware.basicAuth, authController.login);
router.route('/register')
	.post(authController.register);

module.exports = router;
