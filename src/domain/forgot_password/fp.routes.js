const express = require('express');
const router = express.Router();
const { sendPasswordResetOTPEmail } = require('./fp.controller')

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


// Password reset request

router.post("/", async (req, res) => {
    try{ 
        const { userEmail } = req.body;
        console.log(req.body);
        if (!userEmail) throw Error("An email is required.");

        // Send reset otp

        const createdPasswordResetOTP = await sendPasswordResetOTPEmail(userEmail);
        return res.status(201).json({ message: "A password reset link has been sent to your registered email address.", createdPasswordResetOTP });
    } catch (error) {
        console.log(`Error in password-reset POST /: ${error}`);
        res.status(400).send(error.message);

    }
});



module.exports = router;