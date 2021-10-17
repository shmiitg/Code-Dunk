import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import Loading from '../loading/Loading';

const Problem = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState({ options: [] });

    const fetchData = async () => {
        const problemName = pathname.split("/")[2];
        const res = await fetch(`/api/problem/${problemName}`);
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setProblem(data.problem);
        } else if (res.status === 404) {
            history.push('/problems');
        }
    }

    const [chosen, setChosen] = useState(false);
    const checkOption = async (chosen, answer, difficulty) => {
        setChosen(true);
        const showRight = 'show-right';
        const showWrong = 'show-wrong';
        const rightAnswer = document.querySelector('.right-answer')
        const wrongAnswer = document.querySelector('.wrong-answer')
        if (chosen === parseInt(answer)) {
            rightAnswer.classList.add(showRight);
            const res = await fetch('/api/problem/option', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ difficulty })
            })
            const data = await res.json();
            if (res.status !== 200) {
                window.alert(data.error);
            }
        } else {
            wrongAnswer.classList.add(showWrong);
        }
    }

    useEffect(() => {
        fetchData();
    }, [pathname])

    if (loading) return (<Loading />)
    return (
        <div className="container">
            <div className="problem-container">
                <div className="main">
                    <div className="problem-card">
                        <div className="problem-header">
                            <div className="problem-title">{problem.title}</div>
                            <div className="problem-difficulty">{problem.difficulty}</div>
                        </div>
                        <div className="problem-content">
                            <div className="problem-description">{problem.description}</div>
                            <div className="problem-options">
                                {problem.options.map((option, index) => (
                                    <div key={index} className="option" onClick={() => !chosen && checkOption(index + 1, problem.answer, problem.difficulty)}>
                                        <div className="option-number">{String.fromCharCode(index + 65)}</div>
                                        <div className="option-description">{option}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="right-answer">Right</div>
                        <div className="wrong-answer">Wrong</div>
                    </div>
                </div>
                <div className="sidebar"></div>
            </div>
        </div>
    )
}

export default Problem
