const express = require("express");
const Problem = require("../models/problem");
const User = require("../models/user");
const Company = require("../models/company");
const Topic = require("../models/topic");
const verifyJWT = require("../middleware/auth");
const router = express.Router();

// get all problems
router.get("/problems", async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

//get random problems with certain count
router.get("/problems/random/:count", async (req, res) => {
    try {
        const count = Number(req.params.count);
        const problems = await Problem.aggregate([{ $sample: { size: count } }]);
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

// get problems solved by user
router.get("/problems/user", verifyJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ problems: user.problems });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

// edit user problem list
router.post("/problems/user/edit", verifyJWT, async (req, res) => {
    try {
        const { problems } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { problems: problems });
        req.user = user;
        res.status(200).json({ msg: "Edited" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

// separate the problems based on each topic
router.get("/problems/:topic", async (req, res) => {
    try {
        const unique_link = req.params.topic;
        const topic = await Topic.findOne({ unique_link });
        if (!topic) {
            return res.status(404).json({ error: "Topic not found" });
        }
        const problems = await Problem.find({ topic: topic.title });
        res.status(200).json({ problems: problems, topic: topic.title });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

// get problems from each company
router.get("/problems/company/:company", async (req, res) => {
    try {
        const unique_link = req.params.company;
        const company = await Company.findOne({ unique_link });
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }
        const problems = await Problem.find({ companies: { $all: [company.name] } });
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

// get individual problem
router.get("/problem/:link", async (req, res) => {
    try {
        let link = req.params.link;
        const problem = await Problem.findOne({ link: link });
        if (!problem) {
            return res.status(404).json({ error: "Not found" });
        }
        res.status(200).json({ problem: problem });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

module.exports = router;
