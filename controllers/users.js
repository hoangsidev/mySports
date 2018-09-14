const users = require('../resourceAccess/users.js');
const createToken = require('../helpers/auth.js').createToken;
const createHash = require('../helpers/functions.js').createHash;
const toJson = require('../helpers/functions.js').toJson;
const objectId = require('mongodb').ObjectID;

module.exports = {
    signUp: (req, res) => {
        response(res, 201, true, null, {
            token: createToken('123456789'),
            users: {}
        });
    },
}