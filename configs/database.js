const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://airvting:pH6XC30GabiJsXOc@35.240.237.173:27017/airvting', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected mongoDB !'); });
module.exports = mongoose;