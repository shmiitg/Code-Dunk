import React from 'react';
import { Link } from 'react-router-dom';
import './ReadPost.css';

const ReadPost = ({ title, desc, author, date, content }) => {
    return (
        <div className="container">
            <div className="read-post-container">
                <div className="read-post-title">{title}</div>
                <div className="read-post-desc">{desc}</div>
                <div className="read-post-info">
                    <div className="read-post-author"><Link to={`/profile/dashboard?user=${author}`}>{author}</Link></div>
                    <div className="read-post-date">{date}</div>
                </div>
                <div className="read-post-content">{content}</div>
            </div>
        </div >
    )
}

export default ReadPost
