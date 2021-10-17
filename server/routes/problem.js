const express = require('express');
const Problem = require('../models/problem');
const DashBoard = require('../models/dashboard');
const User = require('../models/user');
const verifyJWT = require('../middleware/auth');
const router = express.Router();

router.get('/problems', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/problem/:name', async (req, res) => {
    try {
        let name = req.params.name;
        const title = name[0].toUpperCase() + name.substr(1).replace(/-/g, " ");
        const problem = await Problem.findOne({ title: title });
        if (!problem) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.status(200).json({ problem: problem });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.post('/problem/option', verifyJWT, async (req, res) => {
    try {
        const dashboard = await DashBoard.findOne({ email: req.user.email });
        const problems = dashboard.problems;
        const { difficulty } = req.body;
        difficulty === 'Easy' && problems.easy++;
        difficulty === 'Medium' && problems.medium++
        difficulty === 'Hard' && problems.hard++;
        await dashboard.updateOne({ problems: problems });
        res.status(200).json({ msg: "Saved successfully" });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})

module.exports = router;