import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../loading/Loading';

const ProblemsList = () => {
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/problems');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            const probs = [];
            data.problems.forEach(problem => {
                const idx = probs.map(obj => obj.topic).indexOf(problem.topic);
                if (idx === -1) {
                    probs.push({ topic: problem.topic, questions: [problem.title] })
                }
                else {
                    probs[idx].questions.push(problem.title);
                }
            })
            setProblems(probs);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (<Loading />)
    return (
        <div className="main-card">
            {problems.map((problem, index) => (
                <div key={index} className="problems-card">
                    <div className="problems-title">{problem.topic}</div>
                    <ul className="problems-list">
                        {problem.questions.map((p, idx) => (
                            <li key={idx}>{idx + 1}. <Link to={'/problem/' + p[0].toLowerCase() + p.substr(1).replace(/\s+/g, '-')}>{p}</Link></li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default ProblemsList
