var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
	email: {
		type: String,
		required: true,
		index: {
			unique: true,
		},
		maxlength: 100,
		validate: {
			validator: function(v) {
				return /^\S+@\S+[\.][0-9a-z]+$/.test(v);
			},
			message: '{VALUE} is not a valid email address.',
		},
	},
	password: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		required: true,
		default: Date.now,
	}
	lastLogin: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('User', UserSchema);
