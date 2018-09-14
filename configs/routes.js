const users = require('../routes/users.js');
module.exports = [
    // Auth
    { method: 'POST', path: '/api/v1/signUp', config: users.signUp },

    // Users
    { method: 'GET', path: '/api/v1/users/{userId}', config: users.getUserByUserId }
];