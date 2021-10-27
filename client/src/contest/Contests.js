import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import NewContest from './components/NewContest';
import RunningContest from './components/RunningContest';
import Loading from '../loading/Loading';
import './Contests.css';

const Contests = () => {
    const [loading, setLoading] = useState(true);
    const [contests, setContests] = useState([]);
    const [newContests, setNewContests] = useState([]);
    const [runningContests, setRunningContests] = useState([]);
    const [newContestStatus, setNewContestStatus] = useState([]);
    const [runningContestStatus, setRunningContestStatus] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/contests');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            const newContestArray = []
            const runningContestArray = [];
            for (let i = 0; i < data.newContests.length; i++) newContestArray[i] = 0
            for (let i = 0; i < data.runningContests.length; i++) runningContestArray[i] = 0
            setContests(data.contests);
            setNewContests(data.newContests);
            setRunningContests(data.runningContests);
            setNewContestStatus(newContestArray);
            setRunningContestStatus(runningContestArray);
        } else {
            window.alert(data.error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [newContestStatus, runningContestStatus])

    if (loading) return <Loading />
    return (
        <div className="container">
            <div className="nc-container">
                {newContests.map((contest, index) => (
                    <NewContest key={index} status={newContestStatus} setStatus={setNewContestStatus} index={index} title={contest.title} startTime={contest.startTime} duration={contest.duration} />
                ))}
                {runningContests.map((contest, index) => (
                    <RunningContest key={index} status={runningContestStatus} setStatus={setRunningContestStatus} index={index} title={contest.title} startTime={contest.startTime} duration={contest.duration} />
                ))}
            </div>
            <div className="contest-container">
                <div className="sidebar">
                    <div className="rankings-card">
                        <div className="ranking-heading"></div>
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
