const nodemailer = require("nodemailer");
const { AUTH_EMAIL, AUTH_PASS, SMTP_SERVER } = process.env

let transporter = nodemailer.createTransport({
    host: SMTP_SERVER,
    port: 465,
    secure: true,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,

    }

});


// test transporter 

transporter.verify((error, success) => {
    if (error){
        console.log(error);
    } else {
        console.log("Ready for sending mails");
        console.log(success);
    }
});


const sendEmail = async (mailOptions) => {
    try { 
        await transporter.sendMail(mailOptions);
        return;
        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = sendEmail;