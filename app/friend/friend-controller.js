const boom = require('boom');

const Friend = require('./friend-model');

function read (req, res, next) {
	var id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		return next(boom.notFound('Friend ID invalid.'));
	}
	Friend.findById(id, function (err, friend) {
		if (err) {
			return next(err);
		}
		if (!friend) {
			return next(boom.notFound('Friend not found.'));
		}
		res.json(friend);
	});
}

function create (req, res, next) {
	var friend = new Friend({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: 
		postalAddress:
		phone:
		birthday: req.body.birthday,
		group: req.body.group
	});
	friend.save(function (err, friend) {
		if (err) {
			return next(err);
		}
		res.status(201).json({
			data: friend
		});
	});
}

function update (req, res, next) {
	var id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		return next(boom.notFound('Friend ID invalid.'));
	}
	Friend.findById(id, function (err, friend) {
		if (err) {
			return next(err);
		}
		if (!friend) {
			return next(boom.notFound('Friend not found.'));
		}
		friend.name = req.body.firstname || friend.firstname;
		friend.description = req.body.lastname || friend.lastname;
		friend.save(function (err, friend) {
			if (err) {
				return next(err);
			}
			res.json({
				data: friend
			});
		});
	});
}

function remove (req, res, next) {
	var id = req.params.id;
	Friend.findByIdAndRemove(id, function (err) {
		if (err) {
			return next(err);
		}
		res.status(204);
	});
}

function list (req, res, next) {
	Friend.find(function (err, friends) {
		if (err) {
			return next(err);
		}
		res.json(friends);
	});
}

module.exports = {
	read: read,
	create: create,
	update: update,
	remove: remove,
	list: list
};
