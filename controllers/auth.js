const jwt = require('jsonwebtoken');

const config = require('../config/app');

exports.login = function (req, res, next) {
	const token = jwt.sign({
		id: req.user._id
	}, config.auth.jwt.secret);
	console.log(token);
	res.json({
		token: token
	});
};

exports.register = function (req, res, next) {
	const token = jwt.sing({
		id: req.user._id
	}, config.auth.jwt.secret, {
		expiresIn: 10080
	});
	res.json({
		token: 'JWT ' + token,
		user: req.user
	});
};
