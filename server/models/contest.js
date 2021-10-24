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
        type: Object,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    contributer: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Contest = mongoose.model('contest', schema);
module.exports = Contest;