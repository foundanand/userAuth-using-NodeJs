const OTP = require('./otp.model');
const generateOTP = require('../../util/generateOTP');
const sendEmail = require('./../../util/sendEmail');
const { hashData, verifyHashedData } = require('./../../util/hashData');
const { AUTH_EMAIL } = process.env;


// const verifyOTP = async () => {
//     try{ 

//     } catch (error) {

//     }
// };


// verify OTP
const verifyOTP = async ({userEmail, otp}) => {
    try{ 
        if (!(userEmail && otp)){
            throw Error("Provide values for email and otp");
    
        }

        // ensure OTP exist
        const matchedOTPRecord = await OTP.findOne({
            userEmail,
        });
        if(!matchedOTPRecord){
            throw Error(`No OTP found for this ${userEmail}`);
        }

        // Checking for expired code
        const { expiresAt, otp: hashedOTP } = matchedOTPRecord;

        if (expiresAt < Date.now()){
            await OTP.deleteOne({ userEmail });
            throw Error('Code has expired. Request for a new one.');
        }

        // If not expired and does exist
    
        const validOTP = await verifyHashedData(otp, hashedOTP);
        return validOTP;

    } catch (error) {
        console.log("Located: OTP Contoller 1")
        throw error;

    }
};





const sendOTP = async ({ userEmail, otpSubject, otpMessage, otpDuration = 1 }) => {
    try {
        if (!(userEmail && otpSubject && otpMessage)) {
            throw Error("Provide values for email, subject, message");
        }
        // Clear old record, for creating a new OTP
        await OTP.deleteOne({ userEmail });
        // Generate pin
        const generatedOTP = await generateOTP();
        // send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: userEmail,
            subject: otpSubject,
            html: `<p>${otpMessage}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;"> <b> ${generatedOTP} </b></p>
            <p><b> This code <b>expires in ${otpDuration} hour(s) </b></p>`,
        };
        await sendEmail(mailOptions);

        // Hash and save OTP data
         const hashedOTP = await hashData(generatedOTP);
         console.log(hashedOTP)
         const newOTP = await new OTP({
            userEmail,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: (Date.now() + (3600 * 1000 * otpDuration)), // Converted into miliseconds
         });

         const createdOTPRecord = await newOTP.save();
         return createdOTPRecord;
        
    } catch (error){
        console.log("Located: OTP Contoller 2")
        throw error;
    }
}

const deleteOTP = async (userEmail) => {
    try {
        await OTP.deleteOne({ userEmail });
    } catch (error) {
        console.log("Located: OTP Controller 3");
        throw error;
    }
};


module.exports = { sendOTP, verifyOTP, deleteOTP };
