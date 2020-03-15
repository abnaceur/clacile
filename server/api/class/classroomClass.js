const AccessToken = require('./accessTokenClass');
const mongoose = require('mongoose');

const addNewClassroom = (data) => {
    return new Promise(async (resolve, reject) => {
        let accessToken = new AccessToken();
        resolve({
            _id: new mongoose.Types.ObjectId,
            classTitle: data.classTitle,
            teacherCode: data.teacherCode,
            classRoomToken: await accessToken.generateToken(new mongoose.Types.ObjectId, new mongoose.Types.ObjectId)
        })
    })
}

module.exports = {
    addNewClassroom
}