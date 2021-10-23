import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import './Blog.css';

const Blog = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [blogCount, setBlogCount] = useState(false);

    const fetchData = async () => {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            if (data.blogs.length) {
                setBlogCount(true);
            }
            setBlogs(data.blogs);
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
                    <div className="blog-heading">Blogs trending this week</div>
                    <div className="main-card">
                        {blogCount && blogs.map(blog => (
                            <div className="post">
                                <Link key={blog._id} className="post-link" to={`/blog/read/${blog.link}`}>
                                    <div className="post-title">{blog.title}</div>
                                    <div className="post-desc">{blog.description}</div>
                                    <div className="post-author">Contributed by <span>{blog.author}</span></div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="post-write">
                        <Link className="post-write-btn" to="/blog/new">Write a blog</Link>
                    </div>
                </div>
                <div className="sidebar">

                </div>
            </div>
        </div >
    )

}

export default Blog
