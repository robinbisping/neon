const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = Schema({
	name: {
		type: String,
		required: true,
		maxlength: 100,
	},
	description: {
		type: String,
		maxlength: 1000,
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Group', GroupSchema);
