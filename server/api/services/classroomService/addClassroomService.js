const ClassroomDao = require("../../daos/ClassroomDao") 

async function addClassroom (data, res) {
    let url  = await ClassroomDao.addNewClass(data);
    if (url) {
        let pathUrl = process.env.URL_FRONTEND + ":" + process.env.URL_FRONTEND_PORT + "/class/" 
        + url.classTitle + "/" + url.classRoomToken
        
        res.status(200).json({
            success: true,
            url: pathUrl
        })
    } else {
        res.status(200).json({
            success: false,
        })
    }

}

module.exports = {
    addClassroom
}