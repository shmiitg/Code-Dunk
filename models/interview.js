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
    company: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true }
)

const Interview = mongoose.model('interview', schema);
module.exports = Interview;