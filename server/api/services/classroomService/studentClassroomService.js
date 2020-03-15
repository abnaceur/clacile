const ClassroomDao = require("../../daos/ClassroomDao")

async function studentClassroom(data, res) {

    let classroom = await ClassroomDao.ifExsitsclassroom(data);
    if (classroom) {
        res.status(200).json({
            success: true,
            data: {
                studentName: data.studentName,
                teacherName: classroom.teacherName,
                _id: classroom._id,
                classTitle: classroom.classTitle,
                classRoomToken: classroom.classRoomToken,
            },
            status: "student",
        })
    } else
        res.status(200).json({
            success: false,
        })
}

module.exports = {
    studentClassroom
}