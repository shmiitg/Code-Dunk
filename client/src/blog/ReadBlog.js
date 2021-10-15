import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const ReadBlog = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const [blog, setBlog] = useState({ title: '', description: '', content: '', author: '' });
    const [date, setDate] = useState('');
    const fetchBlog = async () => {
        const res = await axios.get(`/api/blog/read/${id}`);
        const blogData = await res.data.blog;
        if (res.status === 200) {
            setBlog(blogData);
            setDate(moment(blogData.createdAt).format('MMM DD, YYYY'));
        }
    }
    useEffect(() => {
        fetchBlog();
    }, [id])

    return (
        <div className="container">
            <div className="read-blog-container">
                <div className="read-blog-title">{blog.title}</div>
                <div className="read-blog-description">{blog.description}</div>
                <div className="read-blog-info">
                    <div className="read-blog-author"><Link to={`/profile/dashboard?user=${blog.author}`}>{blog.author}</Link></div>
                    <div className="read-blog-date">{date}</div>
                </div>
                <div className="read-blog-content">{blog.content}</div>
            </div>
        </div >
    )
}

export default ReadBlog
