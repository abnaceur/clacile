const contentService = require('../services/contentService/index');

createNewContent = (req, res, next) => {
    contentService.createNewContentService.createNewContent(req, req.body, res)
}

getAllContents = (req, res, next) => {
    let limit = req.params.limit;
    let page = req.params.page;
    let sortByDate = req.params.sortByDate;

    contentService.getAllContentService.getAllContent(res, page, limit, sortByDate)
}

getContentsByUserPassion = (req, res, next) => {
    let limit = req.params.limit;
    let page = req.params.page;
    let sortByDate = req.params.sortByDate;
    let userId = req.params.userId;
    let passion = req.params.passionId;

    contentService.getContentByUserPassionService.getContentByUserPassion(res, page, limit, sortByDate, userId, passion)
}


getAllContentsByPassion = (req, res, next) => {
    let limit = req.params.limit;
    let page = req.params.page;
    let sortByDate = req.params.sortByDate;
    let passion = req.params.passionId;

    contentService.getAllContentByPassionService.getAllContentByPassion(res, page, limit, sortByDate, passion)

}

module.exports = {
    getAllContents,
    getAllContentsByPassion,
    createNewContent,
    getContentsByUserPassion
}