let mongoose = require('mongoose');

// Newsletter schema
let NewsletterSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: String,
	dateOfCreation: {
		type: Date,
		default: Date.now,
	},
	dateOfLastUpdate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Newsletter', NewsletterSchema);