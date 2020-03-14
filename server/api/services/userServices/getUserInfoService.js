const UserDao = require('../../daos/userDao/userDao');

async function userInfo (userId, res) {
    let user = await UserDao.getUserinformation(userId, res);
    res.status(200).json({
        success: true,
        code: 200,
        data: user
    })
}

module.exports = {
    userInfo
}