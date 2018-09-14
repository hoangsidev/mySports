const appConfig = require('../configs/app.js');
const toJson = require('../helpers/functions.js').toJson;
const objectId = require('mongodb').ObjectID;
const sessions = require('../resourceAccess/sessions.js');

module.exports = {
    jwt: {
        key: appConfig.jwt.secret,
        verifyOptions: { algorithms: ['HS256'] },
        validateFunc: (request, decodedToken, callback) => {
            var authorization = request.headers.authorization;
            var parts = authorization.split(/\s+/);
            var token = parts[1];
            // if (decodedToken != {} && token) {
            //     return new Promise((resolve) => {
            //         sessions.findOne({
            //             tokenId: token,
            //             userId: ObjectId(decodedToken._id),
            //             isActive: true
            //         }).then((result) => {

            //             result = toJSON(result);
            //             if (result) {
            //                 if (Math.round((new Date()).getTime() / 1000) > Math.round((new Date(result.expiredAt)).getTime() / 1000)) {
            //                     console.log("ok");
            //                     let condition = {
            //                         _id: ObjectId(result._id),
            //                         userId: ObjectId(decodedToken._id),

            //                     }
            //                     SessionTokens.findOneAndUpdate(condition, { isActive: 0 }).then(result => {

            //                     })
            //                     return callback(Boom.unauthorized('Expired token received for JSON Web Token validation', 'Bearer'));
            //                 }
            //                 return callback(null, true, decodedToken);
            //             } else {
            //                 return callback(Boom.unauthorized('Expired token received for JSON Web Token validation', 'Bearer'));
            //             }
            //         })
            //     })

            // }
            // return callback(Boom.unauthorized('Invalid signature received for JSON Web Token validation', 'Bearer'));

        }
    }
}