const createNewContentService = require('./createNewContentService');
const getAllContentService = require("./getAllContentService");
const getContentByUserPassionService = require("./getContentByUserPassionService")
const getAllContentByPassionService =  require('./getAllContentByPassionService');

module.exports = {
    getAllContentByPassionService,
    getContentByUserPassionService,
    getAllContentService,
    createNewContentService
}