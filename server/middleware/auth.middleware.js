const jwt = require("jsonwebtoken");

const requireAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    const decoded = jwt.verify(token, "mysecreykey");
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin rights required" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = requireAdmin;
