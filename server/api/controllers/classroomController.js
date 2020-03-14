const classroomService = require('../services/classroomService/index');

addClassContent = (req, res, next) => {
    classroomService.addClassroomService.addClassroom(req.body.data, res)
}

module.exports = {
    addClassContent
}