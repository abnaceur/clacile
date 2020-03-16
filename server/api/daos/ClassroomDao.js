const Classroom = require("../models/classroom");
const classroomClass = require("../class/classroomClass.js");

async function addNewClass(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let classroom = new Classroom(await classroomClass.addNewClassroom(data));
            classroom.save()
                .then(results => {
                    resolve({
                        classRoomToken: results.classRoomToken,
                        classTitle: results.classTitle,
                    })
                })
        } catch (err) {
            resolve(false)
        }
    })
}

async function updateTeacherName(data) {
    return new Promise(async (resolve, reject) => {
        try {
            Classroom.find({
                classRoomToken: data.classRoomToken,
                classTitle: data.classTitle,
                teacherCode: data.teacherCode,
                ClassroomDeleted: false,
            }).then(classroom => {
                if (classroom.length > 0) {
                    // Update teacher name
                    classroom[0].teacherName = data.teacherName;
                    Classroom.findByIdAndUpdate(classroom[0]._id,
                        classroom[0], {
                        new: false,
                        useFindAndModify: false,
                    },
                        function (err, results) {
                            if (err) return resolve(false);
                            resolve(classroom[0]);
                        })
                } else resolve(false)
            })
        } catch (err) {
            resolve(false)
        }
    })
}

async function ifExsitsclassroom(data) {
    return new Promise(async (resolve, reject) => {
        try {
            Classroom.find({
                classRoomToken: data.classRoomToken,
                classTitle: data.classTitle,
                ClassroomDeleted: false,
            }).then(classroom => {
                if (classroom.length > 0) {
                    // Update teacher name
                    resolve(classroom[0]);
                } else resolve(false)
            })
        } catch (err) {
            resolve(false)
        }
    })
}

async function getAllclassrooms() {
    return new Promise(async (resolve, reject) => {
        try {
            Classroom.find({
                ClassroomDeleted: false,
            }).then(classroom => {
                // Update teacher name
                resolve(classroom.map(cls => {
                    return ({
                        _id: cls._id,
                        classTitle: cls.classTitle,
                        members: [],
                        messages: []
                    })
                }));
            })
        } catch (err) {
            resolve(false)
        }
    })
}

module.exports = {
    addNewClass,
    getAllclassrooms,
    ifExsitsclassroom,
    updateTeacherName
}