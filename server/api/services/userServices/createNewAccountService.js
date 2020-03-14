const userDao = require('../../daos/userDao/userDao');

async function addNewUser(req, data, res) {
    //check password length
    if (data.password && data.password.length > 8) {
        // check if email and validation code exist
        // and account is active        
        if (await userDao.isAccountValidated(data) === true && await userDao.ifExistUserAccount(data.email) === 0) {
            let photo = req.files && req.files.length > 0 ? req.files[0].path : "Add defauld photo backend";
            if (await userDao.saveNewUserAccount(data, photo)) {
                res.status(200).json({
                    success: true,
                    data: {
                        msg: "Account created with success."
                    },
                    code: 200
                })
            } else {
                res.status(500);
            }
        } else {
            res.status(200).json({
                success: true,
                data: {
                    valid: false,
                    msg: "This account is not active or exists"
                },
                code: 406
            })
        }
    } else {
        res.status(200).json({
            success: true,
            data: {
                valid: false,
                msg: "Password must include more than 08 characters"
            },
            code: 407
        })
    }
}

module.exports = {
    addNewUser
}