const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Interview = require('../models/interview');
const verifyJWT = require('../middleware/auth');

function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes
        .replace(/^-+/, '') // trim - from start of text
        .replace(/-+$/, ''); // trim - from end of text

    return str;
}

//Interview
router.get('/interviews', async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.status(200).json({ interviews: interviews });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/interview/read/:link', async (req, res) => {
    try {
        const link = req.params.link;
        const interview = await Interview.findOne({ link: link });
        if (!interview) {
            return res.status(404).json({ error: 'Nothing found' });
        }
        res.status(200).json({ interview: interview });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.post('/interview/save', verifyJWT, async (req, res) => {
    const { title, company, content } = req.body;
    if (!title || !company || !content) {
        return res.status(422).json({ error: 'All fields are required' });
    }
    try {
        const user = await User.findOne({ email: req.user.email });
        const email = user.email;
        const author = user.username;
        const link = string_to_slug(title);
        const interview = new Interview({ email, title, company, content, author, link });
        await interview.save();
        return res.status(200).json({ msg: "Experience added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})

router.get('/interview/edit/:link', async (req, res) => {
    try {
        const link = req.params.link;
        const interview = await Interview.findOne({ link: link });
        if (!interview) {
            return res.status(404).json({ error: 'Nothing found' });
        }
        res.status(200).json({ interview: interview });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.put('/interview/edit/:link', verifyJWT, async (req, res) => {
    try {
        const link = req.params.link;
        const { title, company, content } = req.body;
        const interview = await Interview.findOne({ link: link });
        if (interview.email === req.user.email) {
            await Interview.findOneAndUpdate({ link: link }, { title: title, company: company, content: content })
            res.status(200).json({ msg: 'Interview experience edited successfully' });
        } else {
            res.status(422).json({ error: 'You can edit only your interview experiences' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.delete('/interview/delete/:link', verifyJWT, async (req, res) => {
    try {
        const link = req.params.link;
        const interview = await Interview.findOne({ link: link });
        if (interview.email === req.user.email) {
            await Interview.findOneAndDelete({ link: link });
            res.status(200).json({ msg: 'Interview experience deleted successfully' });
        } else {
            res.status(422).json({ error: 'You can delete only your interview experiences' });
        }
    } catch (err) {
        res.status(500).json('Some error occured');
    }
})

module.exports = router;