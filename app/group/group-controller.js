const boom = require('boom');

const Group = require('./group-model');

function read (req, res, next) {
	var id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		return next(boom.notFound('Group ID invalid.'));
	}
	Group.findById(id).populate('members').exec(function (err, group) {
		if (err) {
			return next(err);
		}
		if (!group) {
			return next(boom.notFound('Group not found.'));
		}
		res.json(group);
	});
}

function create (req, res, next) {
	var group = new Group({
		name: req.body.name,
		description: req.body.description
	});
	group.save(function (err, group) {
		if (err) {
			return next(err);
		}
		res.status(201).json({
			data: group
		});
	});
}

function update (req, res, next) {
	var id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		return next(boom.notFound('Group ID invalid.'));
	}
	Group.findById(id, function (err, group) {
		if (err) {
			return next(err);
		}
		if (!group) {
			return next(boom.notFound('Group not found.'));
		}
		group.name = req.body.name || group.name;
		group.description = req.body.description || group.description;
		group.save(function (err, group) {
			if (err) {
				return next(err);
			}
			res.json({
				data: group
			});
		});
	});
}

function remove (req, res, next) {
	var id = req.params.id;
	Group.findByIdAndRemove(id, function (err) {
		if (err) {
			return next(err);
		}
		res.status(204);
	});
}

function list (req, res, next) {
	Group.find().populate('members').exec(function (err, groups) {
		if (err) {
			return next(err);
		}
		res.json(groups);
	});
}

module.exports = {
	read: read,
	create: create,
	update: update,
	remove: remove,
	list: list
};
