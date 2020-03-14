
const ContentDao = require('../../daos/contentDao/contentDao');


async function getContentByUserPassion (res, page, limit, sortByDate, userId, passion) {
    let contents = await ContentDao.getContentByUserPassion(res, page, limit, sortByDate, userId, passion);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents
    })
}

module.exports = {
    getContentByUserPassion
}