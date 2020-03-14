const userDao = require('../../daos/userDao/userDao');
const Content = require("../../models/Content");
const ContentClass = require("../../class/ContentClass");
const utils = require("../../utils/utils");

async function createNewContent (req, data, res) {
    // User validation
    if (await userDao.ifExistUserAccountById(data.contentUserId) > 0) {
        // TODO VALIDATE PASSION BY ID
        let photo = req.files && req.files.length > 0 ? req.files[0].path : "Add defauld photo content";
        let contentData = await Content(await ContentClass.createNewContent(data, photo))
        contentData.save()
        .then(response => {
            res.status(200).json({
                success: true,
                data: {
                    msg: "Content created with success",
                },
                code: 200
            })
        }).catch(err => utils.defaultError(res, err))
    } else {
        res.status(406).json({
            success: true,
            data: {
                msg: "This account oes not exist"
            },
            code: 406
        })
    }
}

module.exports = {
    createNewContent
}