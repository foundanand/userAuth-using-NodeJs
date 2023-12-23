const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
