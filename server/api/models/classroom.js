let mongoose = require('mongoose');

// Classroom schema
let ClassroomSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    classTitle: String,
    teacherCode: String,
    classRoomToken: String,
    ClassroomDeleted: {
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

module.exports = mongoose.model('Classroom', ClassroomSchema);