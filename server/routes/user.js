const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Problem = require('../models/problem');

router.get('/profile/dashboard', async (req, res) => {
    try {
        let problems = [0, 0, 0];
        const user = await User.findOne({ username: req.query.user });
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        for (p of user.problems) {
            const prob = await Problem.findById(p);
            prob.difficulty === 'Easy' && problems[0]++;
            prob.difficulty === 'Medium' && problems[1]++;
            prob.difficulty === 'Hard' && problems[2]++;
        }
        const problemsDone = user.problems;
        res.status(200).json({ user: user, problemsDifficulty: problems, problemsDone: problemsDone });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

module.exports = router;