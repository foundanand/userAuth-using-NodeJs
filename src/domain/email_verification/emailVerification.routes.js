const express = require("express");
const router = express.Router();
const { sendVerificationOTPEmail,  verifyUserEmail } = require("./emailVerification.controller");



// const verifyOTP = async () => {
//     try{ 

//     } catch (error) {

//     }
// };

// router.post("/", async () => {
//     try{ 

//     } catch (error) {

//     }
// });

router.post("/verify", async (req, res) => {
    try{ 
        let { userEmail, otp} = req.body;

        if (!(userEmail && otp)) throw Error("Please give all the details");

        await verifyUserEmail({ userEmail, otp })
        res.status(200).json({ userEmail, verified: true });

    } catch (error) {
        console.log("Error in emailVerificationRoutes");
        res.status(400).send(error.message);

    }
});

router.post("/", async (req, res) => {
    try{ 
        const { userEmail } = req.body;
        //Check if recieved userEmail field
        if(!userEmail) throw Error("An email is required!");

        //Send verification Mail
        const createdEmailVerificationOTP = await sendVerificationOTPEmail(userEmail);
        res.status(200).json({ message: "OTP Sent",  createdEmailVerificationOTP} );
    } catch (error) {
        console.log("Error in emailVerification Routes 1");
        res.status(400).send(error.message);

    }
});

module.exports = router;
