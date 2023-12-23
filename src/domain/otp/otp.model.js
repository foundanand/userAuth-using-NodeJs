const mongoose = require('mongoose');
const db = require('./../../config/db');

const { Schema } = mongoose;

const OTPSchema = new Schema({
    userEmail: {
        type: String,
        unique: true,
    },
    opt : String,
    createdAt: Date,
});

const OTP = db.model("OTP", OTPSchema);

module.exports = OTP;