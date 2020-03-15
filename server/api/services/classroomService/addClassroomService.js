const ClassroomDao = require("../../daos/ClassroomDao") 


async function addClassroom (data, res) {
    console.log("Data:", data);
    let url  = await ClassroomDao.addNewClass(data);
    console.log("url ====>:", url);
    if (url) {
        let pathUrl = process.env.URL_FRONTEND + "/" + process.env.URL_FRONTEND_PORT + "/class?title=" 
        + url.classTitle + "&id=" + url.classRoomToken
        
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