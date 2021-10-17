import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import './Contest.css';

const Contest = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const [contest, setContest] = useState({});

    const fetchData = async () => {
        const contestName = pathname.split("/")[2];
        const res = await fetch(`/api/contest/${contestName}`);
        const data = await res.json();
        if (res.status === 200) {
            setContest(data.contest);
        } else if (res.status === 404) {
            console.log('Page not found');
            history.push('/');
        } else {
            history.push('/');
        }
    }
    useEffect(() => {
        fetchData();
    }, [pathname])

    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <div className="contest-card">
                        <div className="contest-card-heading">{contest.title}</div>
                    </div>
                </div>
                <div className="sidebar"></div>
            </div>
        </div>
    )
}

export default Contest
