const jwt = require('jsonwebtoken');

const config = require('../config');

exports.login = function (req, res, next) {
	const token = jwt.sign({
		id: req.user._id
	}, config.auth.secret);
	console.log(token);
	res.json({
		token: token
	});
};

exports.register = function (req, res, next) {
	res.json({
		success: true
	});
};
