const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendSchema = Schema({
	firstname: {
		type: String,
		required: true,
		maxlength: 50
	},
	lastname: {
		type: String,
		required: true,
		maxlength: 50
	},
	email: [{
		address: {
			type: String,
			maxlength: 100,
			validate: {
				validator: function (v) {
					return /^\S+@\S+[.][a-z]+$/.test(v);
				},
				message: '{VALUE} is not a valid email address.'
			}
		},
		type: {
			type: String,
			enum: [
				'personal',
				'business',
				'parental'
			]
		}
	}],
	postalAddress: [{
		street: [{
			type: String,
			maxlength: 100
		}],
		postalCode: {
			type: Number,
			min: 1,
			max: 999999
		},
		city: {
			type: String,
			maxlength: 50
		},
		type: {
			type: String,
			enum: [
				'personal',
				'business',
				'parental'
			]
		}
	}],
	phone: [{
		number: {
			type: String,
			maxlength: 20,
			validate: {
				validator: function (v) {
					return /^[+]\d+$/.test(v);
				},
				message: '{VALUE} is not a valid phone number.'
			}
		},
		type: {
			type: String,
			enum: [
				'personal',
				'business',
				'parental'
			]
		}
	}],
	birthday: {
		type: Date
	},
	group: [{
		type: Schema.ObjectId,
		ref: 'Group'
	}]
});

FriendSchema.virtual('name').get(function () {
	return this.firstname + ' ' + this.lastname;
});

module.exports = mongoose.model('Friend', FriendSchema);
