import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
    const history = useHistory();
    const [blogs, setBlogs] = useState([]);
    const [blogCount, setBlogCount] = useState(false);

    const fetchData = async () => {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (res.status === 200) {
            if (data.blogs.length) {
                setBlogCount(true);
            }
            setBlogs(data.blogs);
        }
    }
    useEffect(() => {
        fetchData();
    }, [blogs]);

    const viewBlog = id => {
        history.push('/blog/read/' + id);
    }

    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <div className="blog-heading">Blogs trending this week</div>
                    <div className="main-card">
                        {blogCount && blogs.map(blog => (
                            <div key={blog._id} className="blog" onClick={() => viewBlog(blog._id)}>
                                <div className="blog-title">{blog.title}</div>
                                <div className="blog-description">{blog.description}</div>
                                <div className="blog-author">Contributed by : <span>{blog.author}</span></div>
                            </div>
                        ))}
                    </div>
                    <div className="blog-write">
                        <Link className="blog-btn" to="/blog/new">Write a blog</Link>
                    </div>
                </div>
                <div className="sidebar">

                </div>
            </div >
        </div>

    )
}

export default Blog
