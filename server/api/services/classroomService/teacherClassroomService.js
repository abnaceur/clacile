const ClassroomDao = require("../../daos/ClassroomDao")

async function teacherClassroom(data, res) {
    let classroom = await ClassroomDao.updateTeacherName(data);
    if (classroom) {
        res.status(200).json({
            success: true,
            data: classroom,
            status: "teacher",
        })
    } else
        res.status(200).json({
            success: false,
        })
}

module.exports = {
    teacherClassroom
}