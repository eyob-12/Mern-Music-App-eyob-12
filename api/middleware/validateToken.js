const jwt = require("jsonwebtoken");
const JWT_SECRET = "gsfgnbdsfccjaGSBDHXx";

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization") || req.header("authorization");

        if (!token) {
            return res.status(403).send("Authorization missing!");
        }

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];

            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send("Invalid auth token");
                }
                req.user = decoded.user;
                next();
            });

            if (!token) {
                res.status(401).send("Authorization token missing");
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = verifyToken;