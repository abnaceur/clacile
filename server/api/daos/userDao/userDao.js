const EmailValiation = require('../../models/EmailValidation');
const User = require('../../models/User');
const AccountValidateCalss = require('../../class/AccountValidationClass');
const UserClass = require("../../class/UserClass"); 
const utils = require('../../utils/utils');

ifExistEmailValidated = (email) => {
    return new Promise((resolve, reject) => {
        EmailValiation.find({
            email: email,
            active: false
        }).exec()
            .then(response => {
                resolve(response.length);
            }).catch(err => console.log("existEmailToBeValidated ERR :", err));
    })
}

getUserinformation = (userId, res) => {
    return new Promise((resolve, reject) => {
        User.find({
            _id: userId,
            blocked: false
        })
        .select(["fullname", "email", "profilePhoto", "dateOfCreation", "passion"])
        .exec()
        .then(user => {
            resolve(user);
        }).catch(err => utils.defaultError(res, err))
    })
}

ifEmailValidated = (email) => {
    return new Promise((resolve, reject) => {
        EmailValiation.find({
            email: email,
            active: true
        }).exec()
            .then(response => {
                resolve(response.length);
            }).catch(err => console.log("existEmailToBeValidated ERR :", err));
    })
}

ifExistEmailValidatedByCodeFullname = (data) => {
    return new Promise((resolve, reject) => {
        EmailValiation.find({
            _id: data.id.length != 24 ? "000000000000000000000000" : data.id,
            validationCode: data.validationCode,
            active: false
        }).exec()
            .then(response => {
                resolve(response.length);
            }).catch(err => console.log("ifExistEmailValidatedByCodeFullname ERR :", err));
    })
}


isAccountValidated = (data) => {
    return new Promise((resolve, reject) => {
        EmailValiation.find({
            _id: data.id.length != 24 ? "000000000000000000000000" : data.id,
            validationCode: data.validationCode,
            active: true
        }).exec()
            .then(response => {
                resolve(response.length === 0 ? false : true);
            }).catch(err => console.log("ifExistEmailValidatedByCodeFullname ERR :", err));
    })
}


ifExistUserAccount = (email) => {
    return new Promise((resolve, reject) => {
        User.find({
            email: email
        }).exec()
            .then(response => {
                resolve(response.length);
            }).catch(err => console.log("existEmailToBeValidated ERR :", err));
    })
}

ifExistUserAccountById = (id) => {
    return new Promise((resolve, reject) => {
        User.find({
            _id: id
        }).exec()
            .then(response => {
                resolve(response.length);
            }).catch(err => console.log("ifExistUserAccountById ERR :", err));
    })
}

updateAccountValidation = (data) => {
    return new Promise(async (resolve, reject) => {
        EmailValiation.find({
            _id: data.id,
            validationCode: data.validationCode,
            active: false
        }).exec()
            .then(response => {
                if (response.length === 0)
                    resolve(false);
                else {
                    response[0].active = true;
                    EmailValiation.findByIdAndUpdate(
                        response[0]._id,
                        response[0],
                        { new: true },
                        (err, todo) => {
                            if (err) resolve(false);
                            resolve(true);
                        }
                    )
                }
            }).catch(err => console.log("ifExistEmailValidatedByCodeFullname ERR :", err));
    })
}

getAccountValidation = (email) => {
    return new Promise(async (resolve, reject) => {
        EmailValiation.find({
            email: email,
            active: false
        }).exec()
            .then(response => {
                resolve(response.length > 0 ? response[0] : response);
            }).catch(err => console.log("GetAccountValidation ERR :", err));
    })
}

async function createAccountValidation(data, code) {
    return new Promise(async (resolve, reject) => {
        // TODO CREATE ACCOUNT VALIDATION
        let accountValidate = new EmailValiation(await AccountValidateCalss.AccountValidate(data, code));
        accountValidate.save()
            .then(res => {
                resolve(accountValidate);
            }).catch(err => {
                console.log("createAccountValidation ERR :", err)
                resolve(false);
            })
    })
}

saveNewUserAccount = (data, photo) => {
    return new Promise(async (resolve, reject) => {
        let user = new User(await UserClass.CreateNewUser(data, photo));
        user.save().then(res => {
            resolve(true);
        }).catch(err => {
            console.log("saveNewUserAccount ERR :", err);
            resolve(false);
        })
    })   
}

module.exports = {
    createAccountValidation,
    getAccountValidation,
    updateAccountValidation,
    ifExistEmailValidated,
    ifExistEmailValidatedByCodeFullname,
    ifExistUserAccount,
    ifEmailValidated,
    ifExistUserAccountById,
    isAccountValidated,
    getUserinformation,
    saveNewUserAccount
}