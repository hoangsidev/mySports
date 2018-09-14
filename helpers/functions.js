const md5 = require('md5');
const objectId = require('mongodb').ObjectID;
module.exports = {
    createHash: (string) => {
        return md5(string);
    },
    toJson: (data) => {
        return JSON.parse(JSON.stringify(data));;
    },
}