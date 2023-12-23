const OTP = require('./otp.model');
const generateOTP = require('../../util/generateOTP');
const sendEmail = require('./../../util/sendEmail');
const { hashData } = require('./../../util/hashData');
const { AUTH_EMAIL } = process.env;

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
         const newOTP = await new OTP({
            userEmail,
            otp: hashedOTP,
            createdAt: Date.now(),
            expireIn: (Date.now() + (3600 * 1000 * otpDuration)), // Converted into miliseconds
         });

         const createdOTPRecord = await newOTP.save();
         return createdOTPRecord;
        
    } catch (error){
        console.log("I am the problem")
        res.status(400).send(error.message);
    }
}

module.exports = { sendOTP };
