const Problem = require("../models/problem");
const data = require("./problems.json");

// const prob = new Problem({
//     title: "a",
//     topic: "b",
//     difficulty: "a",
//     companies: ["a", "b"],
//     link: "x",
// });

async function pushProblems() {
    for (const problem of data) {
        const prob = new Problem({
            title: problem.title,
            topic: problem.topic,
            difficulty: problem.difficulty,
            companies: problem.companies,
            link: problem.link,
        });
        prob.save();
    }
}

async function updateFields() {
    try {
        await Problem.updateMany({}, { $set: { upvote: [{}] } });
    } catch (err) {
        console.log(err);
    }
}
