const mongoose = require('mongoose');
const db = require('./../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userRegID: {
        type: String,
        required: true,
        unique: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    userGender: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    isClubAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = db.model('User', userSchema);

module.exports = User;
