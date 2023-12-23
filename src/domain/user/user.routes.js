const express = require('express');
const router = express.Router();
const { createNewUser } = require('./user.controller');

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
    

    res.status(200).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);

    // Send a more informative error response
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
