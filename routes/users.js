const manager = require('../controllers/users.js');
const joi = require('joi');
const response = require('./response.js').setup(manager);

module.exports = {
    signUp: {
        tags: ['api', 'Auth'],
        description: 'SignUp an Account',
        validate: {
            headers: joi.object({
                language: joi.string().default('en'),
                deviceTypeId: joi.number(),
                deviceName: joi.string(),
                udid: joi.string()
            }).unknown(),
            payload: joi.object({
                fullName: joi.string().required(),
                phoneNumber: joi.number().required(),
                password: joi.string().required()
            })
        },
        handler: (req, res) => {
            response(req, res, 'signUp');
        }
    },

    getUserByUserId: {
        tags: ['api', 'Users'],
        description: 'Get Info User by UserId',
        validate: {
            headers: joi.object({
                language: joi.string().default('en'),
                authorization: joi.string().required().default('Bearer '),
            }).unknown(),
            params: joi.object({
                userId: joi.string().required()
            })
        },
        handler: (req, res) => {
            response(req, res, 'getUserByUserId');
        },
        auth: {
            strategy: 'jwt'
        }
    },


}