const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = Schema({
	email: {
		type: String,
		required: true,
		index: {
			unique: true,
		},
		maxlength: 100,
		validate: {
			validator: function(v) {
				return /^\S+@\S+[\.][0-9a-z]+$/.test(v)
			},
			message: '{VALUE} is not a valid email address.',
		},
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	registered: {
		type: Date,
		required: true,
	},
	last_login: {
		type: Date,
	},
})

UserSchema.pre('save', function(next) {
	let user = this
	// Only continue if password was modified
	if (!user.isModified('password')) {
		return next()
	}
	// Hash password
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err)
			return next(err)
		user.password = hash
		next()
	})
})

UserSchema.methods.verifyPassword = function(new_password, next) {
	// Compare new password with old one
	bcrypt.compare(new_password, this.password, function(err, is_match) {
		if (err)
			return next(err)
		next(null, is_match)
	})
}

module.exports = mongoose.model('User', UserSchema)
