import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProblemsMain = () => {
    const [problems, setProblems] = useState([
        { title: 'Check if all elements of given Linked List corresponds to a downward path from any node in given Binary Tree', statement: 'Find permutation of numbers upto N' },
        { title: 'Find permutation of numbers upto N with a specific sum in a specific range', statement: 'Find permutation of numbers upto N with a specific sum in a specific range' },
        { title: 'System Design', statement: 'Find permutation of numbers upto N with a specific sum in a specific range' },
    ])

    return (
        <div className="main-card">
            {problems.map((problem, index) => (
                <div key={index} className="home-problem-card">
                    <Link to="/"><div className="home-problem-title">{problem.title}</div></Link>
                    <div className="home-problem-statement">{problem.statement}</div>
                </div>
            ))}
        </div>
    )
}

export default ProblemsMain
