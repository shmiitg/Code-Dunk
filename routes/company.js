const express = require("express");
const router = express.Router();
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

module.exports = router;
