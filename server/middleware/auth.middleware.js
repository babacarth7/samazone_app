const jwt = require("jsonwebtoken");

const requireAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: "Access denied. No token provided"});
    }
    try {
        const decoded = jwt.verify(token, "mysecreykey");
        if (!decoded.isAdmin) {
            return res.status(403).json({message: "Access denied. Admin rights required"});
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({message: "Invalid token"});
    }
};

module.exports = requireAdmin;
