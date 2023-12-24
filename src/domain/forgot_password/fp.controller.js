// const verifyOTP = async () => {
//     try{ 

//     } catch (error) {

//     }
// };


const User = require('./../user/user.model');
const { sendOTP, verifyOTP, deleteOTP } = require('./../otp/otp.controller');
const { hashData } = require('./../../util/hashData');


// reset password
const resetUserPassword = async ({userEmail, otp, newPassword}) => {
    try {
        console.log("Verifying OTP...");
        const validOTP = await verifyOTP({ userEmail, otp });
        console.log("OTP Verification Result:", validOTP);

        if (!validOTP) {
            throw Error("Invalid code passed. Check your inbox.");
        }

        console.log("Updating user password...");
        const hashedNewPassword = await hashData(newPassword);
        await User.updateOne({ userEmail }, { userPassword: hashedNewPassword });
        console.log("Password updated successfully.");

        console.log("Deleting OTP...");
        await deleteOTP(userEmail);
        console.log("OTP deleted.");

        return;
    } catch (error) {
        console.log("ERROR: fp.Controller - resetUserPassword");
        throw error;
    }
};




// send password reset mail
const sendPasswordResetOTPEmail = async ( userEmail ) => {
    try{ 

        // Check if an account exist
        const exisitingUser = await User.findOne({ userEmail });
        if(!exisitingUser){
            throw Error("There is no account for the provided email.");
        }

        if (!exisitingUser.verified) {
            throw Error("Please first verify your email address to reset password.")
        }

        const otpDetails = {
            userEmail,
            otpSubject: "Password Reset| @VITKART ",
            otpMessage: "Enter the code below to reset your password.",
            otpDuration: 1
        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;


    } catch (error) {
        throw error;


    }
};


module.exports = { sendPasswordResetOTPEmail, resetUserPassword };
