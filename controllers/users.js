const users = require('../resourceAccess/users.js');
const createToken = require('../helpers/auth.js').createToken;
const insertToken = require('../helpers/auth.js').insertToken;
const md5 = require('md5');
const toJson = require('../helpers/functions.js').toJson;
const resData = require('../helpers/functions.js').resData;
const limitField = require('../helpers/functions.js').limitField;
const objectId = require('mongodb').ObjectID;

module.exports = {
    signUp: (req, res) => {
        return new Promise((resolve, reject) => {
            var data = req.payload;
            data.password = md5(data.password);
            const select = ['phoneNumber', 'fullName'];
            users.findOne({
                condition: { phoneNumber: data.phoneNumber }, select: select
            }).then(existedUser => {
                if (existedUser) {
                    resolve(resData(201, false, 'Existed phone number!', {}));
                } else {
                    users.insert(data).then(user => {
                        if (user) {
                            user = toJson(limitField(select, user));
                            const token = createToken(user._id);
                            insertToken(token);
                            resolve(resData(201, true, null, { token, user }));
                        }
                    }).catch(error => { reject(error); });
                }
            }).catch(error => { reject(error); });
        });
    },

    signIn: (req, res) => {
        var data = req.payload;
        data.password = md5(data.password);
        return new Promise((resolve, reject) => {
            const select = ['fullName'];
            users.findOne({
                condition: { phoneNumber: data.phoneNumber }, select: select
            }).then(user => {
                if (!user) {
                    resolve(resData(201, false, 'Phone number not exist!', {}));
                } else {
                    user = toJson(user);
                    const token = createToken(user._id);
                    insertToken(token);
                    resolve(resData(201, true, null, { token, user }));
                }
            }).catch(error => { reject(error); });
        });
    },

    getUserByUserId: (req, res) => {
        return new Promise((resolve, reject) => {
            var data = req.params;
            users.findOne({
                condition: { _id: objectId(data.userId) }, select: ['fullName']
            }).then(user => {
                if (user) {
                    user = toJson(user);
                    resolve(resData(201, true, null, { user }));
                } else {
                    resolve(resData(201, false, 'User not found!', {}));
                }
            });
        });
    }
}