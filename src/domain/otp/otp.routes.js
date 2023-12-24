const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('./otp.controller');




// Verify OTP
// router.post("/verify", async (req, res) => {
//     try {
//         let { userEmail, otp } = req.body;

//         const validOTP = await verifyOTP({ userEmail, otp})
//         res.status(200).json({ valid: validOTP });

//     } catch (error){
//         console.log("OTP not verified");
//         res.status(400).send(error.message);

//     }

// });

router.post("/verify", async (req, res) => {
    try {
        let { userEmail, otp } = req.body;

        const isValidOTP = await verifyOTP({ userEmail, otp });
        res.status(200).json({ valid: isValidOTP });

    } catch (error) {
        console.error("Error in OTP verification:", error);
        res.status(400).send(error.message);
    }
});


// Send OTP
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
        console.log("Located: OTP Routes");
        res.status(400).send(error.message);

    } 
});

module.exports = router;