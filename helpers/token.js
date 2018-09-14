const jwt = require('jsonwebtoken');
const appConfig = require('../configs/app.js');

function createToken(user) {
    // Sign the JWT
    return jwt.sign({
        _id: user._id
    },
        AppConfig.jwt.secret,
        {
            algorithm: 'HS256',
            expiresIn: AppConfig.jwt.expiresIn
        }
    );
}

module.exports = createToken;