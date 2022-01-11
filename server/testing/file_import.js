const fs = require('fs');
const Problem = require('../models/problem');

let rawdata = fs.readFileSync('./database/problems.json');
let problems = JSON.parse(rawdata);

require('../config/db');

// problems.forEach(problem => {
//     const { title, description, topic, difficulty, company, link } = problem;
//     new Problem({ title: title, description: description, topic: topic, difficulty: difficulty, company: company, link: link }).save();
// })

async function printFiles() {
    for (const problem of problems) {
        const { title, description, topic, difficulty, companies, link } = problem;
        const newProblem = new Problem({ title: title, description: description, topic: topic, difficulty: difficulty, companies: companies, link: link });
        await newProblem.save();
    }
}

printFiles();