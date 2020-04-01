const classroomService = require('../services/classroomService/index');
const Newsletter = require('../models/Newsletter');
const mongoose = require('mongoose');


addClassContent = (req, res, next) => {
    classroomService.addClassroomService.addClassroom(req.body.data, res)
}

teacherClassContent = (req, res, next) => {
    classroomService.teacherClassroomService.teacherClassroom(req.body.data, res)
}

studentClassContent = (req, res, next) => {
    classroomService.studentClassroomService.studentClassroom(req.body.data, res)
}

addVisitor = (req, res, next) => {
    console.log("req : ", req.body);
    let news = new Newsletter({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email
    });

    news.save().then(response => {
        res.status(200).json({
            response
        })
    }).catch(err => {
        res.status(200).json({
            err
        })
    });

}


module.exports = {
    studentClassContent,
    teacherClassContent,
    addVisitor,
    addClassContent
}