const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    problems: {
        type: Array,
        required: true,
    },
    unique_link: {
        type: String,
        required: true,
        unique: true,
    },
});

const Topic = mongoose.model("topic", schema);
module.exports = Topic;
