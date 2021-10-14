import React, { useState, useEffect } from 'react'
import './Contests.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contests = () => {
    const [contests, setContests] = useState([]);

    const fetchData = async () => {
        const res = await axios.get('/api/contests');
        const data = await res.data;
        if (res.status === 200) {
            const contests = data.contests;
            setContests(contests);
        } else {
            window.alert(data.error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container">
            <div className="new-contest-card">
                <div className="time-left">Starts in 5 days</div>
                <div className="contest-name">Contest 170</div>
                <div className="contest-date">Oct 10, 2021 @ 8:00 AM - 9:30 AM GMT+5:30</div>
                <div className="contest-register">Register</div>
            </div>
            <div className="contest-container">
                <div className="sidebar">
                    <div className="rankings-card">
                        <div className="ranking-heading">Global Rankings</div>
                    </div>
                </div>
                <div className="main">
                    <div className="contest-list-card">
                        <div className="contest-list-top">
                            <div className="contest-list-heading">Past Contests</div>
                        </div>
                        <div className="contest-list-bottom">
                            <table className="contest-table">
                                <thead>
                                    <tr>
                                        <th className="first-col">Contest</th>
                                        <th className="second-col">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contests.map(contest => (
                                        <tr key={contest._id} className="cssbdr">
                                            <td className="contest-detail">
                                                <div className="past-contest-name"><Link to={'/contest/' + contest.title.replace(/\s+/g, '-')}>{contest.title}</Link></div>
                                                <div className="past-contest-date">{contest.startTime}</div>
                                            </td>
                                            <td className="past-contest-duration">{contest.duration}</td>
                                            <td className="past-contest-virtual"><div className="virtual"><Link to={'/contest/' + contest.title.replace(/\s+/g, '-')}>Virtual</Link></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contests
