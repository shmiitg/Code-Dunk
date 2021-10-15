const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const verifyJWT = require('../middleware/auth');

// Blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ blogs: blogs });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/blog/read/:id', async (req, res) => {
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
        const author = user.username;
        const blog = new Blog({ email, title, description, content, author });
        await blog.save();
        return res.status(200).json({ msg: "Blog added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})

module.exports = router;