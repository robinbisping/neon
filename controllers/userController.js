const User = require('../models/user');

module.exports = {
	list: function(req, res) {
		User.find(function(err, users){
			if(err) {
				return res.status(500).json({
					message: 'err getting users.'
				});
			}
			return res.json(users);
		});
	},
	show: function(req, res) {
		var id = req.params.id;
		User.findOne({_id: id}, function(err, user){
			if(err) {
				return res.status(500).json({
					message: 'err getting user.'
				});
			}
			if(!user) {
				return res.status(404).json({
					message: 'No such user.'
				});
			}
			return res.json(user);
		});
	},
	remove: function(req, res) {
		var id = req.params.id;
		User.findByIdAndRemove(id, function(err, user){
			if(err) {
				return res.status(500).json({
					message: 'err getting user.'
				});
			}
			return res.json(user);
		});
	},
};
