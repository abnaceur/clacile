const mongoose = require('mongoose');

createNewContent = (data, photo) => {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            contentUserId: data.contentUserId,
            contentTitle: data.contentTitle,
            contentDescription: data.contentDescription,
            contentImage: photo,
            contentType: data.contentType
        })
    })
}


module.exports = {
    createNewContent
}