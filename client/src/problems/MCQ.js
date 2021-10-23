import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import Loading from '../loading/Loading';
import './MCQ.css';

const MCQ = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);
    const [mcqs, setMcqs] = useState([]);
    const [chosen, setChosen] = useState([]);

    const fetchData = async () => {
        const topic = pathname.split("/")[2];
        const res = await fetch(`/api/mcq/${topic}`);
        const data = await res.json();
        const chosenArray = [];
        for (let i = 0; i < data.mcqs.length; i++)chosenArray.push(0);
        setLoading(false);
        if (res.status === 200) {
            setMcqs(data.mcqs);
            setChosen(chosenArray);
        } else if (res.status === 404) {
            history.push('/problems');
        }
    }

    const checkOption = async (index, chosenOption, answer) => {
        chosen[index] = 1;
        console.log(index, 'Clicked');
        const showRight = 'show-right';
        const showWrong = 'show-wrong';
        const rightAnswer = document.querySelectorAll('.right-answer')
        const wrongAnswer = document.querySelectorAll('.wrong-answer')
        if (chosenOption === parseInt(answer)) {
            rightAnswer[index].classList.add(showRight);
        } else {
            wrongAnswer[index].classList.add(showWrong);
        }
    }

    useEffect(() => {
        fetchData();
    }, [pathname])

    if (loading) return (<Loading />)
    return (
        <div className="container">
            <div className="mcq-container">
                <div className="main">
                    {mcqs.map((mcq, index) => (
                        <div key={index} className="mcq-card">
                            <div className="problem-header">
                                <div className="mcq-count">Question {index + 1}</div>
                                <div className="problem-difficulty">{mcq.difficulty}</div>
                            </div>
                            <div className="problem-content">
                                <div className="problem-description">{mcq.description}</div>
                                <div className="mcq-options">
                                    {mcq.options.map((option, idx) => (
                                        <div key={idx} className="option" onClick={() => !chosen[index] && checkOption(index, idx + 1, mcq.answer)}>
                                            <div className="option-number">{String.fromCharCode(idx + 65)}</div>
                                            <div className="option-description">{option}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="right-answer">Right</div>
                            <div className="wrong-answer">Wrong</div>
                        </div>
                    ))}
                </div>
                <div className="sidebar"></div>
            </div>
        </div>
    )
}

export default MCQ
