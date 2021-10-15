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
    // options: {
    //     type: Array,
    //     required: true
    // },
    // answer: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true }
)

const Problem = mongoose.model('problem', schema);
module.exports = Problem;