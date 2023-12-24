const express = require('express');
const router = express.Router();
const { createNewUser, authenticateUser } = require('./user.controller');
const auth = require('./../../middleware/auth');
const { sendVerificationOTPEmail } = require("./../email_verification/emailVerification.controller");

//protected route
router.get("/private_data", auth, (req, res) => {
  res 
    .status(200)
    .send(`You are logged in using ${req.currentUser.userEmail}`);

});


// Sign In
router.post('/', async (req, res) =>{
    try {
        let { userEmail, userPassword } = req.body;
        userEmail = userEmail.trim();
        userPassword = userPassword.trim();

        if(!(userEmail && userPassword)){
            throw Error("Empty credentials supplied");
        }

        const authenticatedUser = await authenticateUser({ userEmail, userPassword});

        res.status(200).json({message: 'SignIn successful' , authenticatedUser });

    } catch (error){
        res.status(400).send(error.message);
    }
})


// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { userName, userRegID, userEmail, userGender, userPassword } = req.body;

    console.log('Received data:', req.body);
    
    console.log('Variables before trimming:', { userName, userRegID, userEmail, userGender, userPassword });

    // Ensure all variables are defined before using trim()
    const trimmedUserName = userName ? userName.trim() : '';
    const trimmedUserRegID = userRegID ? userRegID.trim() : '';
    const trimmedUserEmail = userEmail ? userEmail.trim() : '';
    const trimmedUserGender = userGender ? userGender.trim() : '';
    const trimmedUserPassword = userPassword ? userPassword.trim() : '';

    const validationErrors = [];

    // Check for empty input fields
    if (!trimmedUserName || !trimmedUserEmail || !trimmedUserRegID || !trimmedUserGender || !trimmedUserPassword) {
      validationErrors.push('Empty input fields!');
    }

    // Validate name format
    if (!/^[a-zA-Z ]*$/.test(trimmedUserName)) {
      validationErrors.push('Invalid Name format!');
    }

    // Validate email format
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,47}$/.test(trimmedUserEmail)) {
      validationErrors.push('Invalid email entered');
    }

    // Validate password length
    if (!trimmedUserPassword || trimmedUserPassword.length < 8) {
      validationErrors.push('Password is too short!');
    }

    // If there are validation errors, send them in the response
    if (validationErrors.length > 0) {
      res.status(400).json({ errors: validationErrors });
      return;
    }

    // The rest of your signup logic goes here
    const newUser = await createNewUser({
        userName: trimmedUserName,
        userRegID: trimmedUserRegID,
        userEmail: trimmedUserEmail,
        userGender: trimmedUserGender,
        userPassword: trimmedUserPassword,
    });

    await sendVerificationOTPEmail(userEmail);
    res.status(200).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);

    // Send a more informative error response
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
