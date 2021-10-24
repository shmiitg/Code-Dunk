const express = require('express');
const Contest = require('../models/contest');
const Problem = require('../models/problem');
const router = express.Router();

router.get('/contests', async (req, res) => {
    try {
        let curr = Date.now();
        const allContests = await Contest.find();
        let contests = [];
        let newContests = [];
        let runningContests = [];
        async function updateProbs(contest) {
            for (title of contest.questions) {
                const problem = await Problem.findOne({ title: title });
                const id = problem._id;
                if (!problem.status) {
                    await Problem.findByIdAndUpdate(id, { status: true });
                }
            }
        }
        allContests.forEach(contest => {
            const startTime = contest.startTime;
            let starts = new Date(startTime).valueOf();
            let duration = contest.duration;
            let hr = duration.h;
            let min = duration.m + hr * 60;
            let sec = min * 60;
            let milli = sec * 1000;
            const ends = starts + milli;
            if (curr >= ends) {
                updateProbs(contest);
                contests.push(contest);
            } else if (curr >= starts && curr < ends) {
                runningContests.push(contest);
            } else {
                newContests.push(contest);
            }
        })
        res.status(200).json({ contests: contests, newContests: newContests });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})

router.get('/contest/:link', async (req, res) => {
    try {
        let link = req.params.link;
        const contest = await Contest.findOne({ link: link });
        if (!contest) {
            return res.status(404).json({ error: 'Page not found' });
        }
        let problems = [];
        for (title of contest.questions) {
            const problem = await Problem.findOne({ title: title });
            problem && problems.push(problem);
        }
        res.status(200).json({ contest: contest, problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

module.exports = router;