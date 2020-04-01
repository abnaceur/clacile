let mongoose = require('mongoose');

// Visits schema
let VisitsSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	ipAddress: String,
	visitCount: Number,
    dateOfCreation: {
		type: Date,
		default: Date.now,
	},
	dateOfLastUpdate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Visits', VisitsSchema);