const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Problem = require("../models/problem");

router.get("/profile/dashboard", async (req, res) => {
    try {
        let probs = [0, 0, 0];
        const user = await User.findOne({ username: req.query.user });
        if (!user) {
            return res.status(404).json({ error: "Not found" });
        }
        // const startTime = performance.now();
        const problems = await Problem.find().where("_id").in(user.problems);
        for (p of problems) {
            p.difficulty === "Easy" && probs[0]++;
            p.difficulty === "Medium" && probs[1]++;
            p.difficulty === "Hard" && probs[2]++;
        }
        // const endTime = performance.now();
        // console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
        res.status(200).json({ user: user, probs: probs, done: user.problems.length });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
});

module.exports = router;
