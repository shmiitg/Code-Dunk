import React, { useState, useEffect } from 'react';
import ProblemsCards from './components/ProblemsCards';
import Loading from '../loading/Loading';
import Progress from './components/Progress';
import Companies from './components/Companies';
import FeaturedList from './components/FeaturedList';
import './Problems.css';

const Problems = () => {
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [done, setDone] = useState(0);
    const [days, setDays] = useState(0);
    const [total, setTotal] = useState(1);

    const fetchData = async () => {
        const res = await fetch('/api/problems');
        const userProbs = await fetch('/api/problems/user');
        const data = await res.json();
        const userData = await userProbs.json();
        let probsDone = 0;

        if (res.status === 200 && userProbs.status === 200) {
            const probs = [];
            data.problems.forEach(problem => {
                const idx = probs.map(obj => obj.topic).indexOf(problem.topic);
                if (idx === -1) {
                    probs.push({ topic: problem.topic, questions: [{ title: problem.title, link: problem.link }], solved: 0 })
                    userData.problems.includes(problem._id) && probs[probs.length - 1].solved++;
                } else {
                    probs[idx].questions.push({ title: problem.title, link: problem.link });
                    userData.problems.includes(problem._id) && probs[idx].solved++;
                }
                userData.problems.includes(problem._id) && probsDone++;
            })
            setProblems(probs);
            setDone(probsDone);
            setTotal(data.problems.length);
            setDays(20); // feature to be added later
        }
        else if (res.status === 200) {
            const probs = [];
            data.problems.forEach(problem => {
                const idx = probs.map(obj => obj.topic).indexOf(problem.topic);
                if (idx === -1) {
                    probs.push({ topic: problem.topic, questions: [{ title: problem.title, link: problem.link }], solved: 0 })
                } else {
                    probs[idx].questions.push({ title: problem.title, link: problem.link });
                }
            })
            setProblems(probs);
            setTotal(data.problems.length);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (<Loading />)
    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <ProblemsCards problems={problems} />
                </div>
                <div className="sidebar">
                    <Progress total={total} done={done} days={days} />
                    <Companies />
                    <FeaturedList />
                </div>
            </div>
        </div >
    )
}

export default Problems
