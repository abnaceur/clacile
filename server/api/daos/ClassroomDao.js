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

module.exports = {
    addNewClass
}