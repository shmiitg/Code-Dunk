const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    problems: {
        type: Array,
        required: true,
    },
    unique_link: {
        type: String,
        required: true,
    },
});

const Company = mongoose.model("company", schema);
module.exports = Company;
