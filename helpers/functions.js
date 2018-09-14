const objectId = require('mongodb').ObjectID;
module.exports = {
    toJson: (data) => {
        return JSON.parse(JSON.stringify(data));;
    },
    resData: (statusCode, success, message, data) => {
        return {
            statusCode: statusCode,
            success: success,
            message: message,
            data: data
        };
    }
}