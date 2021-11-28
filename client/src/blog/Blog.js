import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostsLoading from '../components/post/PostsLoading';
import './Blog.css';

const Blog = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        setLoading(false);
        if (res.status === 200) {
            setBlogs(data.blogs);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="container-md">
                <div className="posts">
                    <div className="blog-heading">Blogs trending this week</div>
                    <div className="main-card">
                        {!loading && blogs.map((blog, index) => (
                            <div key={index} className="post">
                                <Link className="post-link" to={`/blog/read/${blog.link}`}>
                                    <div className="post-title">{blog.title}</div>
                                    <div className="post-desc">{blog.description}</div>
                                    <div className="post-author">Contributed by <span>{blog.author}</span></div>
                                </Link>
                            </div>
                        ))}
                        {loading && [1, 2, 3, 4].map(n => (
                            <PostsLoading key={n} />
                        ))}
                    </div>
                </div>
                {!loading && <div className="post-write">
                    <Link className="post-write-btn" to="/blog/new">Write a blog</Link>
                </div>}
            </div>
        </div >
    )

}

export default Blog
