const User = require("./user.model");
const { hashData, verifyHashedData } = require("./../../util/hashData");
const createToken = require("./../../util/createToken");


// Authenticate User
const authenticateUser = async (data) => {
    try {
        const { userEmail, userPassword } = data;
        const fetchedUser = await User.findOne({
            userEmail });
        
        if (!fetchedUser){
            throw Error("Invalid email entered!");
        }

        const hashedPassword = fetchedUser.userPassword;
        const passwordMatch = await verifyHashedData(userPassword, hashedPassword)

        if (!passwordMatch){
            throw Error("Invalid password entered!");
        }

        // If there is a match, create a token
        const tokenData = {userID: fetchedUser._id, userEmail};
        const token = await createToken(tokenData);
        

        // Assign user token
        fetchedUser.token = token;

        // For dev purpose only, remove in production and testing
        console.log(fetchedUser);


        return fetchedUser;

    }catch (error) {
        throw error;
    }
};


// Create User
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

module.exports = { createNewUser, authenticateUser };
