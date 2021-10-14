const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: 'Your name'
    },
    gender: {
        type: String,
        default: 'Not provided'
    },
    location: {
        type: String,
        default: 'Your location'
    },
    birthday: {
        type: String,
        default: ''
    },
    education: {
        type: String,
        default: ''
    },
    skills: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'User'
    }
},
    { timestamps: true }
)

const User = mongoose.model('user', schema);
module.exports = User;