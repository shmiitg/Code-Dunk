const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    companies: {
        type: Array,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Problem = mongoose.model('problem', schema);
module.exports = Problem;