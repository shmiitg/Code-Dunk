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
        required: false,
    },
    problems: {
        type: Array,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    birthday: {
        type: String,
        required: false
    },
    education: {
        type: String,
        required: false
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
        required: false
    },
    bio: {
        type: String,
        required: false
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