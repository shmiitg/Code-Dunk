const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Interview = require('../models/interview');
const verifyJWT = require('../middleware/auth');


//Interview
router.get('/interviews', async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.status(200).json({ interviews: interviews });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/interview/read/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const interview = await Interview.findById(id);
        res.status(200).json({ interview: interview });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.post('/interview/save', verifyJWT, async (req, res) => {
    try {
        const { title, company, content } = req.body;
        const user = await User.findOne({ email: req.user.email });
        const email = user.email;
        const author = user.username;
        const interview = new Interview({ email, title, company, content, author });
        await interview.save();
        return res.status(200).json({ msg: "Experience added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})


module.exports = router;