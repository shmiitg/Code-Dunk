const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    problems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "problem",
        },
    ],
    unique_link: {
        type: String,
        required: true,
        unique: true,
    },
});

const Topic = mongoose.model("topic", schema);
module.exports = Topic;
