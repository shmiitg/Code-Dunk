const express = require("express");
const Topic = require("../models/topic");
const router = express.Router();

router.get("/topics", async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).json({ topics: topics });
    } catch (err) {
        res.status(500).send({ message: "Some error occured" });
    }
});

// const slugify = (str) =>
//     str
//         .toLowerCase()
//         .trim()
//         .replace(/[^\w\s-]/g, "")
//         .replace(/[\s_-]+/g, "-")
//         .replace(/^-+|-+$/g, "");

// async function pushCompanies() {
//     const problems = await Problem.find();
//     let mp = {};
//     problems.forEach((problem) => {
//         mp[problem.topic] = [];
//     });
//     problems.forEach((problem) => {
//         mp[problem.topic].push(problem._id.toString());
//     });
//     for (const key in mp) {
//         const slug = slugify(key);
//         const topic = new Topic({ title: key, problems: mp[key], unique_link: slug });
//         await topic.save();
//     }
// }

// pushCompanies();

module.exports = router;
