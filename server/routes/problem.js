const express = require('express');
const Problem = require('../models/problem');
const DashBoard = require('../models/dashboard');
const MCQ = require('../models/mcq');
const verifyJWT = require('../middleware/auth');
const router = express.Router();

router.get('/problems/daily', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/problems', async (req, res) => {
    try {
        const problems = await Problem.find({ status: true });
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/companies', async (req, res) => {
    try {
        const problems = await Problem.find({ status: true });
        const companyList = [];
        problems.forEach(problem => {
            problem.companies.forEach(company => companyList.push(company))
        })
        res.status(200).json({ companies: companyList });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/problems/company/:company', async (req, res) => {
    try {
        const company = req.params.company;
        const problems = await Problem.find({ companies: { $all: [company] } })
        console.log(problems);
        res.status(200).json({ problems: problems });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

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

const getTopic = (str) => {
    let ans = str[0].toUpperCase();
    for (let i = 1; i < str.length; i++) {
        if (str[i] === '-') {
            ans += ' ';
            ans += str[i + 1].toUpperCase();
            i++;
        } else {
            ans += str[i];
        }
    }
    return ans;
}

router.get('/problem/tc/:link', verifyJWT, async (req, res) => {
    try {
        let link = req.params.link;
        const problem = await Problem.findOne({ link: link });
        let tc = '', ans = '';
        if (problem.tc) {
            tc = problem.tc;
            ans = problem.ans;
        }
        res.status(200).json({ tc: tc, ans: ans });
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.get('/mcq/:topic', async (req, res) => {
    try {
        let topicLink = req.params.topic;
        const topic = getTopic(topicLink);
        const mcqs = await MCQ.find({ topic: topic });
        if (!mcqs) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.status(200).json({ mcqs: mcqs })
    } catch (err) {
        res.status(500).json({ error: 'Some error occured' });
    }
})

router.post('/mcq/option', verifyJWT, async (req, res) => {
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