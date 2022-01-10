const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        default: 'This is only a test description of the problem, not the actual description. The actual description of the problem will be avaiable in the original website which you can see when you visit the link to solve this problem and then click on the solve button'
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
    link: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Problem = mongoose.model('problem', schema);
module.exports = Problem;