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
                    probs.push({ topic: problem.topic, questions: [{ title: problem.title, link: problem.link }] })
                }
                else {
                    probs[idx].questions.push({ title: problem.title, link: problem.link });
                }
            })
            setProblems(probs);
        }
    }

    const genLink = (str) => {
        let ans = '';
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') {
                ans += '-';
            } else {
                ans += str[i].toLowerCase();
            }
        }
        return ans;
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
                            <li key={idx}>{idx + 1}. <Link to={'/problem/' + p.link}>{p.title}</Link></li>
                        ))}
                    </ul>
                    <div className="problems-mcq"><Link to={`/mcq/${genLink(problem.topic)}`}>Multiple Choice questions on {problem.topic}</Link></div>
                </div>
            ))}
        </div>
    )
}

export default ProblemsList
