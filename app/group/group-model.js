const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = Schema({
	name: {
		type: String,
		required: true,
		maxlength: 100
	},
	description: {
		type: String,
		maxlength: 1000
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'Friend'
	}]
});

module.exports = mongoose.model('Group', GroupSchema);
