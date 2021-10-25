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

router.get('/blog/read/:link', async (req, res) => {
    try {
        const link = req.params.link;
        const blog = await Blog.findOne({ link: link });
        if (!blog) {
            return res.status(404).json({ error: 'Nothing found' });
        }
        res.status(200).json({ blog: blog });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})


function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes
        .replace(/^-+/, '') // trim - from start of text
        .replace(/-+$/, ''); // trim - from end of text

    return str;
}

router.post('/blog/save', verifyJWT, async (req, res) => {
    const { title, description, content } = req.body;
    if (!title || !description || !content) {
        return res.status(422).json({ error: 'All fields are required' });
    }
    try {
        const user = await User.findOne({ email: req.user.email });
        const email = user.email;
        const author = user.username;
        const link = string_to_slug(title);
        const blog = new Blog({ email, title, description, content, author, link });
        await blog.save();
        return res.status(200).json({ msg: "Blog added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})

module.exports = router;