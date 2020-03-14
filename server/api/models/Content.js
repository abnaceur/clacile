let mongoose = require('mongoose');

// Content schema
let ContentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	contentUserId: String,
	contentTitle: String,
    contentDescription: String,
    contentImage: String,
    contentType: String,
    contentDeleted: {
        type: Boolean,
        default: false,
    },
    dateOfCreation: {
		type: Date,
		default: Date.now,
	},
	dateOfLastUpdate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Content', ContentSchema);