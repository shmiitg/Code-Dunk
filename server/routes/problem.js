const express = require('express');
const Problem = require('../models/problem');
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

module.exports = router;