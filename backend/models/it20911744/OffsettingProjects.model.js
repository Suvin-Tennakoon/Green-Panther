const mongoose = require('mongoose');

const Schema = mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	benifits: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('', Schema);
