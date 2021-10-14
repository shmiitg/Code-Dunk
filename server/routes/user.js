const express = require('express');
const router = express.Router();
const User = require('../models/user');
const DashBoard = require('../models/dashboard');

router.get('/profile/dashboard', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.user });
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        const dashBoard = await DashBoard.findOne({ email: user.email });
        res.status(200).json({ dashBoard: dashBoard, user: user });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

module.exports = router;