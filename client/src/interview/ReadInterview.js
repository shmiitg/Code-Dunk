import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const ReadInterview = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const [interview, setInterview] = useState({ title: '', company: '', content: '', author: '' });
    const [date, setDate] = useState('');
    const fetchInterview = async () => {
        const res = await axios.get(`/interview/fetch/${id}`);
        const interviewData = await res.data.interview;
        if (res.status === 200) {
            setInterview(interviewData);
            // setDate(new Date(interviewData.createdAt).toDateString());
            setDate(moment(interviewData.createdAt).format('MMM DD, YYYY'));
        }
    }
    useEffect(() => {
        fetchInterview();
    }, [id])
    return (
        <div className="container">
            <div className="read-interview-container">
                <div className="read-interview-title">{interview.title}</div>
                <div className="read-interview-company">{interview.company}</div>
                <div className="read-interview-info">
                    <div className="read-interview-author"><Link to={`/dashboard?user=${interview.author}`}>{interview.author}</Link></div>
                    <div className="read-interview-data">{date}</div>
                </div>
                <div className="read-interview-content">{interview.content}</div>
            </div>
        </div >
    )
}

export default ReadInterview
