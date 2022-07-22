const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const Company = require("../models/company");

//get all companies
router.get("/companies", async (req, res) => {
    try {
        let companies = await Company.find();
        companies = companies.sort((a, b) => b.problems.length - a.problems.length);
        res.status(200).json({ companies: companies });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

const slugify = (str) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

async function pushCompanies() {
    const problems = await Problem.find();
    let mp = {};
    problems.forEach((problem) => {
        problem.companies.forEach((company) => {
            mp[company] = [];
        });
    });
    problems.forEach((problem) => {
        problem.companies.forEach((company) => {
            mp[company].push(problem);
        });
    });
    for (const key in mp) {
        const slug = slugify(key);
        const company = new Company({ name: key, problems: mp[key], unique_link: slug });
        await company.save();
    }
}

module.exports = router;
