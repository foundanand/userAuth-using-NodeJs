const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const emailVerificationRouter = require('./src/routers/emailVerification.router');
const fpRouter = require('./src/routers/fp.router');
const otpRouter = require('./src/routers/otp.router');
const userRouter = require('./src/routers/user.router');


app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/emailVerification', emailVerificationRouter);
app.use('/api/v1/fp', fpRouter);
app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/user', userRouter);




module.exports = app;