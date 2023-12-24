const jwt = require("jsonwebtoken");
const { resolvePath } = require("react-router-dom");
const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).json({ error: "An authentication token is required" });
        }

        // Verify token
        const decodedToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;

        // If token is verified, proceed with the request
        return next();
    } catch (error) {
        // If the token is invalid or there's an error in verification
        return res.status(401).json({ error: "Invalid token provided" });
    }
};

module.exports = verifyToken;