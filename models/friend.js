const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendSchema = Schema({
	firstname: {
		type: String,
		required: true,
		maxlength: 50,
	},
	lastname: {
		type: String,
		required: true,
		maxlength: 50,
	},
	email: [EmailSchema],
	postalAddress: [PostalAddressSchema],
	phone: [PhoneNumberSchema],
	birthday: {
		type: Date,
	},
	group: [{
		type: Schema.ObjectId,
		ref: 'Group',
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

FriendSchema.virtual('name').get(function () {
	return this.firstname + ' ' + this.lastname;
});

// Sub schemas
var EmailSchema = Schema({
	address: {
		type: String,
		maxlength: 100,
		validate: {
			validator: function(v) {
				return /^\S+@\S+[\.][0-9a-z]+$/.test(v);
			},
			message: '{VALUE} is not a valid email address.',
		},
	},
	type: {
		type: String,
		enum: [
			'personal',
			'business',
			'parental',
		],
	},
});

var PostalAddressSchema = Schema({
	street: [{
		type: String,
		maxlength: 100,
	}],
	postalCode: {
		type: Number,
		min: 1,
		max: 999999,
	},
	city: {
		type: String,
		maxlength: 50,
	},
	type: {
		type: String,
		enum: [
			'personal',
			'business',
			'parental',
		],
	},
});

var PhoneSchema = Schema({
	number: {
		type: String,
		maxlength: 20,
		validate: {
			validator: function(v) {
				return /^[+]\d+$/.test(v);
			},
			message: '{VALUE} is not a valid phone number.',
		},
	},
	type: {
		type: String,
		enum: [
			'personal',
			'business',
			'parental',
		],
	},
});

module.exports = mongoose.model('Friend', FriendSchema);
