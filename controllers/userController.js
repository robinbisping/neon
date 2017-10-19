const User = require('../models/user')

module.exports = {

	list: function(req, res) {
		User.find(function(err, users){
			if(err)
				return res.send(err)
			res.json(users);
		})
	},

	get: function(req, res) {
		var id = req.params.id
		User.findById(id, function(err, user){
			if(err)
				res.send(err)
			res.json(user)
		});
	},

	create: function(req, res) {
		var user = new User({
			email: req.body.email,
			password: req.body.password,
		})
		user.save(function(err){
			if(err)
				res.send(err)
			res.json({
				message: 'User created.',
			})
		})
	},

	remove: function(req, res) {
		var id = req.params.id
		User.findByIdAndRemove(id, function(err){
			if(err)
				res.send(err)
			res.json({
				message: 'User removed.',
			})
		})
	},

}
