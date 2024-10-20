const jwt = require("jsonwebtoken");
const config = require('../config');

// Middleware to verify User token
const verifyUserToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers["authorization"];
        if (!authorizationHeader) {
            return res
                .status(401)
                .send({ message: "Authorization header missing", success: false });
        }

        const token = req.headers["authorization"].split(" ")[1];

        // Make sure you're using the same secret key here
        jwt.verify(token, config.userSecret, (err, decode) => {
            if (err) {
                return res
                    .status(401)
                    .send({ message: "Token is not valid", success: false });
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.error(error); // Handle or log the error appropriately
        res.status(500).send({ message: "Internal server error", success: false });
    }
};

module.exports = verifyUserToken;

