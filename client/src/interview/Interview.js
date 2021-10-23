import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import './Interview.css';

const Interview = () => {
    const [loading, setLoading] = useState(true);
    const [interviews, setInterviews] = useState([]);
    const [interviewCount, setInterviewCount] = useState(false);

    const fetchData = async () => {
        const res = await fetch('/api/interviews');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            if (data.interviews.length) {
                setInterviewCount(true);
            }
            setInterviews(data.interviews);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (<Loading />)
    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <div className="interview-heading">
                        <div className="interview-heading-title">Interview Experience</div>
                        <div className="interview-heading-info">Read other's interview experience and share yours</div>
                    </div>
                    <div className="main-card">
                        {interviewCount && interviews.map(interview => (
                            <div className="post">
                                <Link key={interview._id} className="post-link" to={`/interview/read/${interview.link}`}>
                                    <div className="post-title">{interview.title}</div>
                                    <div className="post-desc">{interview.company}</div>
                                    <div className="post-author">{interview.author}</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="post-write">
                        <Link className="post-write-btn" to="/interview/new">Share you experience</Link>
                    </div>
                </div>
                <div className="sidebar">

                </div>
            </div>
        </div>
    )
}

export default Interview
