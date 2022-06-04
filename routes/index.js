const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyJWT = require("../middleware/auth");

router.get("/user/info", verifyJWT, (req, res) => {
    try {
        const user = req.user;
        const { password, ...rest } = user._doc;
        res.status(200).json({ user: rest });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

router.post("/user/edit", verifyJWT, async (req, res) => {
    try {
        const { name, education, gender, birthday, location } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, {
            name: name,
            education: education,
            gender: gender,
            birthday: birthday,
            location: location,
        });
        req.user = user;
        res.status(200).json({ msg: "Details saved successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

module.exports = router;
