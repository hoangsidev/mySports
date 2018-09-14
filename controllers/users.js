const users = require('../resourceAccess/users.js');
const createToken = require('../helpers/auth.js').createToken;
const insertToken = require('../helpers/auth.js').insertToken;
const md5 = require('md5');
const toJson = require('../helpers/functions.js').toJson;
const resData = require('../helpers/functions.js').resData;
const objectId = require('mongodb').ObjectID;

module.exports = {
    signUp: (req, res) => {
        var data = req.payload;
        data.password = md5(data.password);
        return new Promise((resolve, reject) => {
            users.findOne({
                condition: { phoneNumber: data.phoneNumber }, select: ['phoneNumber']
            }).then(existedUser => {
                if (existedUser) {
                    resolve(resData(201, false, 'Existed Phone Number!', {}));
                } else {
                    users.insert(data).then(newUser => {
                        if (newUser) {
                            users.findOne({
                                condition: { _id: objectId(newUser._id) }, select: ['fullName']
                            }).then(userInfo => {
                                const token = createToken(userInfo._id);
                                insertToken(token);
                                resolve(resData(201, true, null, {
                                    token: token,
                                    user: userInfo
                                }));
                            });
                        }
                    }).catch(error => { reject(error); });
                }
            }).catch(error => { reject(error); });
        });
    },

    getUserByUserId: (req, res) => {
        var data = req.params;
        return new Promise((resolve, reject) => {
            users.findOne({
                condition: { _id: objectId(data.userId) }, select: ['fullName']
            }).then(result => {
                resolve(resData(201, true, null, {
                    user: result
                }));
            });
        });
    }
}