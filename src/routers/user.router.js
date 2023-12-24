const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/user.controller');

//protected route
router.get("/private_data", auth, (req, res) => {
  res 
    .status(200)
    .send(`You are logged in using ${req.currentUser.userEmail}`);

});


// Sign In and Sign Up

router.post('/createNewAccount', userController.signUp);
router.post('/signIn', userController.signIn);


module.exports = router;

