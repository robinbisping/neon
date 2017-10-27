const boom = require('boom');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../user/user-model');

const JWT_AUTH_HEADER_REGEX = /^ *(?:[Bb][Ee][Aa][Rr][Ee][Rr]) [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=] *$/;

module.exports = auth;

function auth (req, res, next) {
	var header = req.headers.authorization;
	// Validate authentication header
	var token = parse(header, JWT_AUTH_HEADER_REGEX);
	if (!token) {
		return next(boom.unauthorized('Wrong authentication format.'));
	}
	// Verify token
	jwt.verify(token[1], config.auth.secret, function (err, decoded) {
		if (err) {
			return next(err);
		}
		User.findById(decoded.id, function (err, user) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return next(boom.unauthorized('User does not exist.'));
			}
			res.locals.user = user;
			next();
		});
	});
};

function parse (str, regex) {
	return regex.exec(str);
}
