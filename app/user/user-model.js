const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = Schema({
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		},
		maxlength: 100,
		validate: {
			validator: function (v) {
				return /^\S+@\S+[.][0-9a-z]+$/.test(v);
			},
			message: '{VALUE} is not a valid email address.'
		}
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	created_at: {
		type: Date,
		required: true
	},
	last_request: {
		type: Date
	}
});

UserSchema.pre('save', function (next) {
	let user = this;
	// Only continue if password was modified
	if (!user.isModified('password')) {
		return next();
	}
	// Hash password
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function (newPassword, next) {
	// Compare new password with stored password
	bcrypt.compare(newPassword, this.password, function (err, isMatch) {
		if (err) {
			return next(err);
		}
		next(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
