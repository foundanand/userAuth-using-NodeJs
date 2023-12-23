const User = require("./user.model");
const { hashData } = require("./../../util/hashData");

const createNewUser = async (data) => {
    try {
        const { userName, userRegID, userEmail, userGender, userPassword } = data;

        const existingUser = await User.findOne({ email: userEmail });

        if (existingUser) {
            throw Error("User already exists");
        }

        // Hash Passwords
        const hashedPassword = await hashData(userPassword);
        const newUser = new User({
            userName,
            userRegID,
            userEmail,
            userGender,
            userPassword: hashedPassword,
        });
        
        const createdUser = await newUser.save();
        return createdUser;

    } catch (error) {
        throw error;
    }
};

module.exports = { createNewUser };
