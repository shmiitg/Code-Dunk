import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import Loading from '../loading/Loading';

const ReadBlog = () => {
    const history = useHistory();
    const location = useLocation();
    const link = location.pathname.split('/')[3];
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState({ title: '', description: '', content: '', author: '' });
    const [date, setDate] = useState('');
    const fetchBlog = async () => {
        const res = await fetch(`/api/blog/read/${link}`);
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setBlog(data.blog);
            setDate(moment(data.blog.createdAt).format('MMM DD, YYYY'));
        }
        else if (res.status === 404) {
            history.push('/blogs');
        }
        else {
            window.alert(data.error);
        }
    }
    useEffect(() => {
        fetchBlog();
    }, [link])

    if (loading) return (<Loading />)
    return (
        <div className="container">
            <div className="read-post-container">
                <div className="read-post-title">{blog.title}</div>
                <div className="read-post-desc">{blog.description}</div>
                <div className="read-post-info">
                    <div className="read-post-author"><Link to={`/profile/dashboard?user=${blog.author}`}>{blog.author}</Link></div>
                    <div className="read-post-date">{date}</div>
                </div>
                <div className="read-post-content">{blog.content}</div>
            </div>
        </div >
    )
}

export default ReadBlog
