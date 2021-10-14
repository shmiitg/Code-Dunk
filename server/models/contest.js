const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    startTime: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: false
    },
    contributer: {
        type: String,
        default: ''
    }
}, { timestamps: true }
)

const Contest = mongoose.model('contest', schema);
module.exports = Contest;