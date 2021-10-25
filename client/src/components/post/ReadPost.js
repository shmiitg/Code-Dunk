import React from 'react';
import { Link } from 'react-router-dom';
import './ReadPost.css';

const ReadPost = ({ title, desc, author, date, content }) => {
    const contentDivs = content.split('\n');

    return (
        <div className="container">
            <div className="read-post-container">
                <div className="read-post-title">{title}</div>
                <div className="read-post-desc">{desc}</div>
                <div className="read-post-info">
                    <div className="read-post-author"><Link to={`/profile/dashboard?user=${author}`}>{author}</Link></div>
                    <div className="read-post-date">{date}</div>
                </div>
                <div className="read-post-content">
                    {contentDivs.map((cont, index) => (
                        <div className={cont === '' ? "post-lines line-break" : "post-lines"} key={index}>{cont}</div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ReadPost
