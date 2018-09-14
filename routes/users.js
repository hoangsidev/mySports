const manager = require('../controllers/users.js');
const joi = require('joi');
const resonsive = require('./response.js').setup(manager);

module.exports = {
    signUp: {
        tags: ['api', 'Auth'],
        description: 'Sign up',
        validate: {
            headers: joi.object({
                language: joi.string().default('en'),
                devicetypeid: joi.number(),
                devicename: joi.string(),
                udid: joi.string()
            }).unknown(),
            payload: joi.object({
                email: joi.string().email().required(),
                password: joi.string().required()
            })
        },
        handler: function (req, res) {
            resonsive(req, res, 'signUp');
        }
    }

}