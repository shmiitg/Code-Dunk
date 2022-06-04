const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/auth/register", async (req, res) => {
    const { username, email, password, cpassword } = req.body;
    if (!username || !email || !password || !cpassword) {
        return res.status(422).json({ error: "All fields required" });
    }
    if (password !== cpassword) {
        return res.status(422).json({ error: "Passwords do not match" });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ username, email, password: hashedPassword });
        const emailExists = await User.findOne({ email: email });
        const userNameExists = await User.findOne({ username: username });
        if (emailExists) {
            return res.status(400).json({ error: "Email already taken" });
        } else if (userNameExists) {
            return res.status(400).json({ error: "Username already taken" });
        }
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: 24 * 60 * 60 * 1000,
        });
        res.cookie("usertoken", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        })
            .status(200)
            .json({ msg: "Successfully registered", token: token });
        // res.status(200).json({ msg: 'Successfully registered' });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

router.post("/auth/login", async (req, res) => {
    const { key, password } = req.body;
    if (!key || !password) {
        return res.status(400).json({ error: "All fields required" });
    }
    try {
        const user =
            (await User.findOne({ username: key })) || (await User.findOne({ email: key }));
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const validated = await bcrypt.compare(password, user.password);
        if (!validated) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: 24 * 60 * 60 * 1000,
        });
        res.cookie("usertoken", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        })
            .status(200)
            .json({ msg: "Successfully logged in", token: token });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

router.get("/auth/logout", (req, res) => {
    try {
        res.status(200).clearCookie("usertoken").json({ msg: "Successfully logged out" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

module.exports = router;
