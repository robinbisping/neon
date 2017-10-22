const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

passport.use(new BasicStrategy(
	function (email, password, next) {
		User.findOne({ email: email }, function (err, user) {
			if (err) {
				return next(err);
			}
			// User does not exist
			if (!user) {
				return next(null, false);
			}
			// Verify password
			User.verifyPassword(password, function (err, isMatch) {
				if (err) {
					return next(err);
				}
				// Wrong password
				if (!isMatch) {
					return next(null, false);
				}
				// Username and password correct
				return next(null, user);
			});
		});
	}
));

exports.is_authenticated = passport.authenticate('basic', { session: false });
