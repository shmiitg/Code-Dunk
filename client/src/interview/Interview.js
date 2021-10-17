import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../loading/Loading';
import './Interview.css';

const Interview = () => {
    const history = useHistory();
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

    const viewInterview = id => {
        history.push('/interview/read/' + id);
    }

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
                            <div key={interview._id} className="interview-item" onClick={() => viewInterview(interview._id)}>
                                <div className="interview-item-title">{interview.title}</div>
                                <div className="interview-item-company">{interview.company}</div>
                                <div className="interview-item-user">{interview.author}</div>
                            </div>
                        ))}
                    </div>

                    <div className="interview-share">
                        <Link className="interview-btn" to="/interview/new">Share you experience</Link>
                    </div>
                </div>
                <div className="sidebar">

                </div>
            </div>
        </div>
    )
}

export default Interview
