const boom = require('boom');

const User = require('./user-model');

exports.read = function (req, res, next) {
	var id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		return next(boom.notFound('User ID invalid.'));
	}
	User.findById(id, function (err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(boom.notFound('User not found.'));
		}
		res.json(user);
	});
};

exports.create = function (req, res, next) {
	var user = new User({
		email: req.body.email,
		password: req.body.password,
		created_at: Date.now()
	});
	user.save(function (err, user) {
		if (err) {
			return next(err);
		}
		res.status(201).json({
			data: user
		});
	});
};

exports.update = function (req, res, next) {
	var id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		return next(boom.notFound('User ID invalid.'));
	}
	User.findById(id).select('+password').exec(function (err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(boom.notFound('User not found.'));
		}
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;
		user.save(function (err, user) {
			if (err) {
				return next(err);
			}
			res.json({
				data: user
			});
		});
	});
};

exports.delete = function (req, res, next) {
	var id = req.params.id;
	User.findByIdAndRemove(id, function (err) {
		if (err) {
			return next(err);
		}
		res.status(204);
	});
};

exports.list = function (req, res, next) {
	User.find(function (err, users) {
		if (err) {
			return next(err);
		}
		res.json(users);
	});
};
