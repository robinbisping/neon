const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

passport.use(new BasicStrategy(
	function(email, password, callback) {
		User.findOne({ email: email }, function (err, user) {
			if (err) { return callback(err); }
			// User does not exist
			if (!user) { return callback(null, false); }
			// Verify password
			User.verifyPassword(password, function(err, is_match) {
				if(err) { return callback(err); }
				// Wrong password
				if(!is_match) { return callback(null, false); }
				// Username and password correct
				return callback(null, user);
			});
		});
	}
));

exports.is_authenticated = passport.authenticate('basic', { session : false });
