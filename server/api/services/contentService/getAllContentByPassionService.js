const ContentDao = require('../../daos/contentDao/contentDao');

async function getAllContentByPassion (res, page, limit, sortByDate, passion) {
    let contents = await ContentDao.getAllContentByPassion(res, page, limit, sortByDate, passion);
    res.status(200).json({
        success: true,
        code: 200,
        data: contents
    })
}


module.exports = {
    getAllContentByPassion  
}