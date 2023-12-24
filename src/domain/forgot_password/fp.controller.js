// const verifyOTP = async () => {
//     try{ 

//     } catch (error) {

//     }
// };


const User = require('./../user/user.model');
const { sendOTP } = require('./../otp/otp.controller');


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


module.exports = { sendPasswordResetOTPEmail };
