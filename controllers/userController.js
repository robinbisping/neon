const User = require('../models/user')

module.exports = {

	list: function(req, res, next) {
		User.find(function(err, users){
			if(err)
				return next(err)
			res.json(users);
		})
	},

	get: function(req, res, next) {
		var id = req.params.id
		User.findById(id, function(err, user){
			if(err)
				return next(err)
			res.json(user)
		})
	},

	create: function(req, res, next) {
		var user = new User({
			email: req.body.email,
			password: req.body.password,
			registered: Date.now(),
		})
		user.save(function(err){
			if(err)
				return next(err)
			res.json({
				message: 'User created.',
			})
		})
	},

	remove: function(req, res, next) {
		var id = req.params.id
		User.findByIdAndRemove(id, function(err){
			if(err)
				return next(err)
			res.json({
				message: 'User removed.',
			})
		})
	},

}
