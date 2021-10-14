const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        default: 1500
    },
    ranking: {
        type: String,
        default: '-'
    },
    contests: {
        type: Number,
        default: 0
    },
    problems: {
        easy: {
            type: Number,
            default: 0
        },
        medium: {
            type: Number,
            default: 0
        },
        hard: {
            type: Number,
            default: 0
        }
    }
},
    { timestamps: true }
)

const DashBoard = mongoose.model('dashboard', schema);
module.exports = DashBoard;