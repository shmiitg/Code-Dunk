const express = require('express');
const Contest = require('../models/contest');
const router = express.Router();

router.get('/contests', async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json({ contests: contests });
    } catch (err) {
        res.status(500).json({ error: "Some error occured" });
    }
})

router.get('/contest/:name', async (req, res) => {
    try {
        let name = req.params.name;
        const title = name.replace(/-/g, " ");
        const contest = await Contest.findOne({ title: title });
        if (!contest) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.status(200).json({ contest: contest });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

module.exports = router;