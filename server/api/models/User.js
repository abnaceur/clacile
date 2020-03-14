let mongoose = require('mongoose');

// User schema
let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        default: "",
    },
    lastname: {
        type: String,
        default: "",
    },
    fullname: {
        type: String,
        require: true,
    },
    email: String,
    password: String,
    passion: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "USER",
    },
    profilePhoto: String,
    status: {
        type: String,
        default: "Active",
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    dateOfLastUpdate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);