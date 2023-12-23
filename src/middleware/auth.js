const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env

const verifyToken = async (req, res, next) => {

    try {
        const token = 
        req.body.token || req.query.token || req.headers["x-access-token"];
    
        if (!token){
            return res.status(403).send("An authentication token is required");
        }
    
        // Verify token
        const decodedToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;


    } catch (error){
        return res.status(401).send("Invalid token provide");


    }

    // If token is verified, proceed with request
    return next();
    
};

module.exports = verifyToken;
