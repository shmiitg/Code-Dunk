import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReadMoreProblem from '../../components/ReadMoreProblem'

const ProblemsMain = () => {
    const [problems, setProblems] = useState([])

    const fetchData = async () => {
        const res = await fetch('/api/problems/daily');
        const data = await res.json();
        if (res.status === 200) {
            setProblems([data.problems[0], data.problems[1], data.problems[2]]);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="main-card">
            {problems.map((problem, index) => (
                <ReadMoreProblem key={index} title={problem.title} difficulty='' description={problem.description} link={`/problem/${problem.link}`} />
            ))}
        </div>
    )
}

export default ProblemsMain
