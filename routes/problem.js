const express = require('express');
const Problem = require('../models/problem');
const User = require('../models/user');
const verifyJWT = require('../middleware/auth');
const router = express.Router();

// get all problems
router.get('/problems', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

// get problems solved by user
router.get('/problems/user', verifyJWT, async (req, res) => {
    try {
        const problems = req.user.problems;
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

// edit user problem list
router.post('/problems/user/edit', verifyJWT, async (req, res) => {
    try {
        const { problems } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { problems: problems });
        req.user = user;
        res.status(200).json({ msg: 'Edited' });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

// convert start alphabet of every word to upper case
function getTopic(topic) {
    topic = topic.replace('-', ' ');
    let top = '';
    for (let i = 0; i < topic.length; i++) {
        if (i == 0) top += topic[i].toUpperCase();
        else if (topic[i - 1] === ' ') top += topic[i].toUpperCase();
        else top += topic[i];
    }
    return top;
}

// separate the problems based on each topic
router.get('/problems/:topic', async (req, res) => {
    try {
        const topic = getTopic(req.params.topic);
        const problems = await Problem.find({ topic: topic });
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

// get all company names
router.get('/companies', async (req, res) => {
    try {
        const problems = await Problem.find();
        const companyList = [];
        problems.forEach(problem => {
            problem.companies.forEach(company => companyList.push(company))
        })
        res.status(200).json({ companies: companyList });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

// get problems from each company 
router.get('/problems/company/:company', async (req, res) => {
    try {
        const company = req.params.company;
        const problems = await Problem.find({ companies: { $all: [company] } })
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

// get individual problem
router.get('/problem/:link', async (req, res) => {
    try {
        let link = req.params.link;
        const problem = await Problem.findOne({ link: link });
        if (!problem) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.status(200).json({ problem: problem });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

module.exports = router;