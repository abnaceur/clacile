const Content = require("../../models/Content");
const utils = require('../../utils/utils');

findAllContents = (res) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false
        }).then(contents => {
            resolve(contents)
        }).catch(err => utils.defaultError(res, err))
    })
}

getAllContentByPageLimit = (res, page, limit, sortByDate) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false
        }).sort({ 'dateOfCreation': sortByDate === "0" ? 1 : -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .exec()
            .then(async contents => {
                let allContents = await findAllContents(res);

                resolve({
                    per_page: parseInt(limit),
                    total: allContents.length,
                    total_pages: Math.floor(allContents.length / limit),
                    data: contents,
                })
            }).catch(err => utils.defaultError(res, err))
    })
}

getAllContentByUserPassion = (res, userId, passion) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            contentUserId: userId,
            contentType: passion
        }).exec()
            .then(async contents => {
                resolve(contents.length);
            }).catch(err => utils.defaultError(res, err))
    })
}

getContentByUserPassion = (res, page, limit, sortByDate, userId, passion) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            contentUserId: userId,
            contentType: passion
        }).sort({ 'dateOfCreation': sortByDate === "0" ? 1 : -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .exec()
            .then(async contents => {
                let allContents = await getAllContentByUserPassion(res);

                resolve({
                    per_page: parseInt(limit),
                    total: allContents.length,
                    total_pages: Math.floor(allContents.length / limit),
                    data: contents,
                })
            }).catch(err => utils.defaultError(res, err))
    })
}

getAllContentByPassionCount = (res, passion) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            contentType: passion
        }).exec()
            .then(async contents => {
                resolve(contents.length);
            }).catch(err => utils.defaultError(res, err))
    })
}

getAllContentByPassion = (res, page, limit, sortByDate, passion) => {
    return new Promise((resolve, reject) => {
        Content.find({
            contentDeleted: false,
            contentType: passion
        }).sort({ 'dateOfCreation': sortByDate === "0" ? 1 : -1 })
            .skip(Number(page * limit))
            .limit(Number(limit))
            .exec()
            .then(async contents => {
                let allContents = await getAllContentByPassionCount(res);

                resolve({
                    per_page: parseInt(limit),
                    total: allContents.length,
                    total_pages: Math.floor(allContents.length / limit),
                    data: contents,
                })
            }).catch(err => utils.defaultError(res, err))
    })
}

module.exports = {
    findAllContents,
    getAllContentByPassion,
    getAllContentByPageLimit,
    getContentByUserPassion
}