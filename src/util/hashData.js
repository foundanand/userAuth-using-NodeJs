const bcrypt = require("bcrypt");

const hashData = async (data, saltRounds = 10) => {
    try { 
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;

    } catch (error){
        res.status(400).send(error.message);
    }
};

const verifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcrypt.compare(unhashed, hashed);
        return match;

    } catch (error) {
        res.status(400).send(error.message);

    }
};

module.exports = { hashData, verifyHashedData };
