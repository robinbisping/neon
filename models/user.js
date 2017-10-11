const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', function(next) {
	// Only continue if password was modified
	if (!this.isModified('password')) {
		return next();
	}
	// Hash password
	bcrypt.hash(this.password, 10, function(error, hash) {
		if (error) {
			return next(error);
		}
		this.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function(newPassword, callback) {
	// Compare new password with old one
	bcrypt.compare(newPassword, this.password, function(error, isMatch) {
		if (error) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
