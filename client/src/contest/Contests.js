import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import NewContest from './components/NewContest';
import './Contests.css';

const Contests = () => {
    const [contests, setContests] = useState([]);
    const [newContests, setNewContests] = useState([]);

    const fetchData = async () => {
        const res = await axios.get('/api/contests');
        const data = await res.data;
        if (res.status === 200) {
            setContests(data.contests);
            setNewContests(data.newContests)
        } else {
            window.alert(data.error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container">
            <div className="nc-container">
                {newContests.map((contest, index) => (
                    <NewContest key={index} title={contest.title} startTime={contest.startTime} duration={contest.duration} dateNow={new Date().getMinutes()} />
                ))}
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
                                                <div className="past-contest-name"><Link to={'/contest/' + contest.link}>{contest.title}</Link></div>
                                                <div className="past-contest-date">{moment(contest.startTime).format('MMM DD, YYYY')} at {moment(contest.startTime).format('h:mm A')}</div>
                                            </td>
                                            <td className="past-contest-duration">{contest.duration.h} h {contest.duration.m} m</td>
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
