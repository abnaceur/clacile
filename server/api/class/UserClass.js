const mongoose = require('mongoose');
const utils = require('../utils/utils');

async function CreateNewUser(data, photo) {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = await utils.hashPassword(data.password);
        resolve({
            _id: new mongoose.Types.ObjectId,
            fullname: data.fullname,
            email: data.email,
            password: hashedPwd,
            passion: data.passion,
            profilePhoto: photo,
        })
    })

}

module.exports = {
    CreateNewUser
}