import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

const Problem = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [problem, setProblem] = useState({});

    const fetchData = async () => {
        const problemName = pathname.split("/")[2];
        const res = await fetch(`/api/problem/${problemName}`);
        const data = await res.json();
        if (res.status === 200) {
            setProblem(data.problem);
        } else if (res.status === 400) {
            res.push('/problems');
            console.log('Page not found');
        } else {
            history.push('/');
        }
    }

    useEffect(() => {
        fetchData();
    }, [pathname])

    return (
        <div className="container">
            <div className="main">
                <div className="problem-card">
                    <div className="problem-title">{problem.title}</div>
                    <div className="problem-difficuly">{problem.difficulty}</div>
                </div>
            </div>
            <div className="sidebar"></div>
        </div>
    )
}

export default Problem
