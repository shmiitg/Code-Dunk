import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { IoCaretBack } from 'react-icons/io5';
import './Contest.css';

const Contest = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [contest, setContest] = useState({});
    const [problems, setProblems] = useState([]);

    const fetchData = async () => {
        const contestName = pathname.split("/")[2];
        const res = await fetch(`/api/contest/${contestName}`);
        const data = await res.json();
        if (res.status === 200) {
            setContest(data.contest);
            setProblems(data.problems);
            console.log(data.problems);
        } else if (res.status === 404) {
            console.log('Page not found');
            history.push('/contests');
        }
        else {
            history.push('/');
        }
    }
    useEffect(() => {
        fetchData();
    }, [pathname])

    return (
        <div className="container">
            <div className="contest-page-container">
                <div className="go-back">
                    <Link to='/contests'><IoCaretBack />Back to Contests</Link>
                </div>
                <div className="contest-heading">{contest.title}</div>
                <div className="contest-status-box">
                    <div className="contest-status">The contest has ended</div>
                </div>
                <div className="contest-questions-list">
                    <div className="contest-question">
                        <div className="problem-list-heading">Problems List</div>
                    </div>
                    {problems.map((problem, index) => (
                        <div className="contest-question" key={index}>
                            <Link to={`/problem/${problem.link}`}>{problem.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contest
