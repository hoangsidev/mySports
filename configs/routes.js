const users = require('../routes/users.js');
module.exports = [
    { method: 'POST', path: '/api/v1/signUp', config: users.signUp }
];