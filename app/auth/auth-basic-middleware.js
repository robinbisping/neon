const boom = require('boom');

const User = require('../user/user-model');

const BASIC_AUTH_HEADER_REGEX = /^(?:[Bb][Aa][Ss][Ii][Cc]) ([A-Za-z0-9._~]+=*)$/;
const USER_PASSWORD_REGEX = /^([^:]+):(.+)$/;

function Credentials (email, password) {
	this.email = email;
	this.password = password;
}

function auth (req, res, next) {
	var header = req.headers.authorization;
	// Validate authentication header
	var match = parse(header, BASIC_AUTH_HEADER_REGEX);
	if (!match) {
		return next(boom.unauthorized('Wrong authentication format.'));
	}
	// Decode and validate email and password
	var data = parse(decodeBase64(match[1]), USER_PASSWORD_REGEX);
	if (!data) {
		return next(boom.unauthorized('Wrong authentication format.'));
	}
	var credentials = new Credentials(data[1], data[2]);
	// Check whether user exists or not
	User.findOne({ email: credentials.email }).select('+password').exec(function (err, user) {
		if (err) {
			return next(err);
		}
		// User does not exist
		if (!user) {
			return next(boom.unauthorized('User does not exist.'));
		}
		// Verify password
		user.comparePassword(credentials.password, function (err, isMatch) {
			if (err) {
				return next(err);
			}
			// Wrong password
			if (!isMatch) {
				return next(boom.unauthorized('Invalid password.'));
			}
			// Username and password correct
			res.locals.user = user;
			next();
		});
	});
}

function parse (str, regex) {
	return regex.exec(str);
}

function decodeBase64 (str) {
	return Buffer.from(str, 'base64').toString();
}

module.exports = auth;
