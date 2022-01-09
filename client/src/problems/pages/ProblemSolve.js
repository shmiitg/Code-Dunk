import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import Loading from '../../loading/Loading';
import Compiler from '../components/Compiler';
import '../css/Problems.css';
import styles from '../css/ProblemSolve.module.css';

const ProblemSolve = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);
    const [problem, setProblem] = useState({ desc: [] });

    const fetchData = async () => {
        const problemName = pathname.split("/")[2];
        const res = await fetch(`/api/problem/${problemName}`);
        const data = await res.json();
        setLoading(false);
        const desc = splitSentence(data.problem.description);
        if (res.status === 200) {
            setProblem({ ...data.problem, desc });
        } else if (res.status === 404) {
            history.push('/problems');
        }
    }

    const splitSentence = (str) => {
        let newStr = [];
        let curr = '';
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '\n') {
                newStr.push(curr);
                curr = '';
            }
            else {
                curr += str[i];
            }
        }
        newStr.push(curr);
        return newStr;
    }

    useEffect(() => {
        fetchData();
    }, [pathname])

    if (loading) return (<Loading />)
    return (
        <div className={styles["problem-container"]}>
            <div className={styles["fluid-container"]}>
                <div className="problem-container">
                    <div className="code-language"></div>
                    <div className="problem-card">
                        <div className={styles["problem-header"]}>
                            <div className="problem-title">{problem.title}</div>
                            <div className="problem-difficulty">{problem.difficulty}</div>
                        </div>
                        <div className="problem-content">
                            {problem.desc.map((des, idx) => (
                                <div key={idx} className="problem-description">{des}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <Compiler />
            </div>
        </div >
    )
}

export default ProblemSolve
