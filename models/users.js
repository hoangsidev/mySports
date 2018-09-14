const mongoose = require('../configs/database.js');
const schema = mongoose.Schema;
const objectId = schema.ObjectId;
const usersSchema = new mongoose.Schema({
    typeAccount: { type: String, default: 'standard' },
    social: {
        socialId: { type: String, default: null },
        socialToken: { type: String, default: null },
        socialType: { type: String, default: null },
    },
    username: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    birth: { type: Date, default: Date.now },
    fullName: { type: String, default: null },
    gender: { type: Number, default: 0 },
    phoneNumber: { type: Number, default: 0 },
    featuredImage: { type: String, default: null },
    coverImage: { type: String, default: null },
    description: { type: String, default: null },
    popular: { type: Number, default: 0 },
    isOnline: { type: Boolean, default: false },
    status: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });
module.exports = mongoose.model('users', usersSchema); 