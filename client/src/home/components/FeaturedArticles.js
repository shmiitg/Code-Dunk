import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FeaturedArticles = () => {
    const [blogs, setBlogs] = useState([])

    const fetchData = async () => {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        res.status === 200 && setBlogs(data.blogs.slice(0, 3));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Featured Articles</div>
            <div className="sidebar-card-content">
                {blogs.map((blog, index) => (
                    <div key={index} className="home-article-card" >
                        <div className="home-article-card-left">{index > 9 ? `${index + 1}` : `0${index + 1}`}</div>
                        <div className="home-article-card-right">
                            <Link to={`/blog/read/${blog.link}`} className="home-article-card-title">{blog.title}</Link>
                            <div className="home-article-card-date">{moment(blog.createdAt).format('DD MMM, YYYY')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedArticles

