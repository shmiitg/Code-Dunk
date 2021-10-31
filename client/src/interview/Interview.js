import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostsLoading from '../components/post/PostsLoading';
import './Interview.css';

const Interview = () => {
    const [loading, setLoading] = useState(true);
    const [interviews, setInterviews] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/interviews');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setInterviews(data.interviews);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <div className="posts">
                        <div className="blog-heading">
                            Read other's interview experience and share yours
                        </div>
                        <div className="main-card">
                            {!loading && interviews.map((interview, index) => (
                                <div key={index} className="post">
                                    <Link className="post-link" to={`/interview/read/${interview.link}`}>
                                        <div className="post-title">{interview.title}</div>
                                        <div className="post-desc">{interview.company}</div>
                                        <div className="post-author">Contributed by <span>{interview.author}</span></div>
                                    </Link>
                                </div>
                            ))}
                            {loading && [1, 2, 3, 4].map(n => (
                                <PostsLoading key={n} />
                            ))}
                        </div>
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
