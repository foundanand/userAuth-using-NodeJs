const express = require('express');
const router = express.Router();
const { sendPasswordResetOTPEmail, resetUserPassword } = require('./fp.controller')

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


// Reset Password 
router.post("/reset", async (req, res) => {
    try {
        let { userEmail, otp, newPassword } = req.body;

        // Log received values
        console.log("Received values:", { userEmail, otp, newPassword });

        if (!(userEmail && otp && newPassword)) {
            throw Error("Empty credentials are not allowed.");
        }

        await resetUserPassword({ userEmail, otp, newPassword });

        // Respond with a success status code ( 204 )
        res.status(200).json({ message: "Password Updated" });
    } catch (error) {
        console.error("Error in password-reset route:", error.message);

        // Respond with an appropriate error status code (e.g., 400 - Bad Request)
        res.status(400).send(error.message);
    }
});




// Password reset request

router.post("/", async (req, res) => {
    try{ 
        const { userEmail } = req.body;
        console.log(req.body);
        if (!userEmail) throw Error("An email is required.");

        // Send reset otp

        const createdPasswordResetOTP = await sendPasswordResetOTPEmail(userEmail);
        const responseData = {
            message: "Password reset OTP sent!",
            userEmail,
            passwordReset: true,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.log(`Error in password-reset POST /: ${error}`);
        res.status(400).send(error.message);

    }
});



module.exports = router;