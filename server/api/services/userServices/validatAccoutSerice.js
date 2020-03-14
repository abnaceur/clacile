const userDao = require('../../daos/userDao/userDao');
const utils = require('../../utils/utils');
const userEmailsTemplate = require('../../emails/userEmails/accountCodeValidationEmail');
const emailSender = require('../../utils/emailSender');

async function validateEmailAccount(data, res) {
    // vlidation email and fullname
    // TODO ADD MORE VALIDATIONS
    if (data.email != "" && data.fullname != "") {
        // Check if email exists
        let users = await userDao.ifExistUserAccount(data.email);
        let valideAccount = await userDao.ifExistEmailValidated(data.email);

        let accountActive = await userDao.ifEmailValidated(data.email);

        if (users > 0) {
            // Return error message
            res.status(200).json({
                success: true,
                msg: "Account exists",
                code: 302
            })
        } else if (accountActive > 0) {
            res.status(200).json({
                success: true,
                msg: "Account already validated",
                code: 302
            })

        } else {
            let response = {};
            let code = "";
            if (valideAccount > 0) {
                response = await userDao.getAccountValidation(data.email);
                code = response.validationCode;
            } else {
                // create account validation
                code = utils.generateRandomNum(6);
                response = await userDao.createAccountValidation(data, code);
            }
            if (response !== false) {
                // Send Email with code
                let msg = userEmailsTemplate.accountCodeValidation(code);
                emailSender.sendEmail("PAGEX TEAM", data.email, "Validation code", msg);
                res.status(200).json({
                    succes: true,
                    code: 200,
                    data: {
                        id: response._id,
                        validationCode: response.validationCode,
                    }
                })
            } else {
                res.status(500)
            }
        }
    }


}

module.exports = {
    validateEmailAccount
}