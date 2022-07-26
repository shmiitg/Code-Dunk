const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.usertoken;
        if (!token) {
            return res.status(401).json({ error: "You need a token" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: "No user found" });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
};

module.exports = verifyJWT;
