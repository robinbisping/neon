const express = require('express');
const router = express.Router();
const passport = require('passport');

// Authentication routes
const authController = require('../controllers/auth');
router.route('/login')
	.get(passport.authenticate('basic', { session: false }), authController.login);
router.route('/register')
	.post(authController.register);

module.exports = router;
