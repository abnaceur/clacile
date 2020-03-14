const ContentDao = require('../../daos/contentDao/contentDao');

async function getAllContent (res, page, limit, sortByDate) {
    let contents = await ContentDao.getAllContentByPageLimit(res, page, limit, sortByDate);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents
    })
}

module.exports = {
    getAllContent
}