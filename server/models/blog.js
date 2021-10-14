const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Blog = mongoose.model('blog', schema);
module.exports = Blog;