const jwt = require("jsonwebtoken");
const config = require('../config');

// Middleware to verify Admin token
const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        // Verify token with admin's secret key
        const decoded = jwt.verify(token.split(' ')[1], config.adminSecret);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error });
    }
};

module.exports = verifyAdminToken;
