const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../user/user-model');

function login (req, res, next) {
	const token = jwt.sign({
		id: req.user._id
	}, config.auth.secret);
	res.json({
		token: token
	});
}

function register (req, res, next) {
	var user = new User({
		email: req.body.email,
		password: req.body.password,
		created_at: Date.now()
	});
	user.save(function (err, user) {
		if (err) {
			return next(err);
		}
		const token = jwt.sign({
			id: user._id
		}, config.auth.secret);
		res.json({
			token: token
		});
	});
}

module.exports = {
	login: login,
	register: register
};
