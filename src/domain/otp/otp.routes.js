const express = require('express');
const router = express.Router();
const { sendOTP } = require('./otp.controller');


router.post("/", async (req, res) => {
    try{
        const { userEmail, otpSubject, otpMessage, otpDuration } = req.body;

        const createdOTP = await sendOTP({
            userEmail,
            otpSubject,
            otpMessage,
            otpDuration,

        });
        res.status(200).json({message: 'OTP Sent' , createdOTP});
    } catch (error) {
        console.log("problem is here");
        res.status(400).send(error.message);

    } 
});

module.exports = router;