
const User = require("./../user/user.model");
const { sendOTP, verifyOTP, deleteOTP } = require("./../otp/otp.controller");




// const verifyOTP = async () => {
//     try{ 

//     } catch (error) {

//     }
// };


const verifyUserEmail = async ({userEmail, otp}) => {
    try{ 
        const validOTP = await verifyOTP({ userEmail, otp });
        if (!validOTP) {
            throw Error('Invalid OTP');
        }

        // Delete if OTP verifited
        await deleteOTP(userEmail);
        return;

    } catch (error) {
        console.log("Unable: Email Verification");
        throw error;


    }
};



const sendVerificationOTPEmail = async (userEmail) => {
    try{ 
        // Check if the email account exists
        const exisitingUser = await User.findOne({ userEmail });
        if (!exisitingUser) {
            throw Error("Account doesn't exist");
        }

        const otpDetails = {
            userEmail,
            otpSubject: "Email Verification | @VITKART ",
            otpMessage: "Verify your email with the code below",
            otpDuration: 1


        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;

    } catch (error) {
        throw error;

    }
};

module.exports = { sendVerificationOTPEmail, verifyUserEmail };