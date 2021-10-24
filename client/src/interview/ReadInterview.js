import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loading from '../loading/Loading';

const ReadInterview = () => {
    const history = useHistory();
    const location = useLocation();
    const link = location.pathname.split('/')[3];
    const [loading, setLoading] = useState(true);
    const [interview, setInterview] = useState({ title: '', company: '', content: '', author: '' });
    const [date, setDate] = useState('');
    const fetchInterview = async () => {
        const res = await fetch(`/api/interview/read/${link}`);
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setInterview(data.interview);
            setDate(moment(data.interview.createdAt).format('MMM DD, YYYY'));
        }
        else if (res.status === 404) {
            history.push('/interview');
        }
    }
    useEffect(() => {
        fetchInterview();
    }, [link])

    if (loading) return (<Loading />)
    return (
        <div className="container">
            <div className="read-post-container">
                <div className="read-post-title">{interview.title}</div>
                <div className="read-post-desc">{interview.company}</div>
                <div className="read-post-info">
                    <div className="read-post-author"><Link to={`/profile/dashboard?user=${interview.author}`}>{interview.author}</Link></div>
                    <div className="read-post-date">{date}</div>
                </div>
                <div className="read-post-content">{interview.content}</div>
            </div>
        </div >
    )
}

export default ReadInterview
