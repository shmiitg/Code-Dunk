const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');
const Interview = require('../models/interview');

// auth middleware
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.usertoken;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            res.json({ error: 'No user found' });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'You need a token' });
    }
}

router.get('/user/info', verifyJWT, (req, res) => {
    const user = req.user;
    const { password, ...rest } = user._doc;
    res.status(200).json({ user: rest });
})

router.post('/user/edit', verifyJWT, async (req, res) => {
    try {
        const { name, gender, location } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { name: name, gender: gender, location: location });
        req.user = user;
        res.status(200).json({ msg: 'Edited' });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

// Blogs
router.get('/blogs/fetch', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ blogs: blogs });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/blog/fetch/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        res.status(200).json({ blog: blog });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.post('/blog/save', verifyJWT, async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const user = await User.findOne({ email: req.user.email });
        const email = user.email;
        const author = user.name;
        const blog = new Blog({ email, title, description, content, author });
        await blog.save();
        return res.status(200).json({ msg: "Blog added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})


//Interview
router.get('/interviews/fetch', async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.status(200).json({ interviews: interviews });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/interview/fetch/:id', async (req, res) => {
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
        const author = user.name;
        const interview = new Interview({ email, title, company, content, author });
        await interview.save();
        return res.status(200).json({ msg: "Experience added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})


module.exports = router;