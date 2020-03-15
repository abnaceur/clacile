const classroomService = require('../services/classroomService/index');

addClassContent = (req, res, next) => {
    classroomService.addClassroomService.addClassroom(req.body.data, res)
}

teacherClassContent = (req, res, next) => {
    classroomService.teacherClassroomService.teacherClassroom(req.body.data, res)
}

module.exports = {
    teacherClassContent,
    addClassContent
}