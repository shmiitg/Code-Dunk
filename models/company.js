const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    },
});

const Company = mongoose.model("company", schema);
module.exports = Company;
