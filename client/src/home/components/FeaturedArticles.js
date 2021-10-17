import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedArticles = () => {
    const [articles, setArticles] = useState([
        { title: 'Master the Coding Interview – Contest Series Based On Real Interviews', date: '8 Aug, 2021' },
        { title: 'Must Do Coding Questions for Product Based Companies', date: '8 Aug, 2021' },
        { title: 'Recently Asked Interview Questions in Product Based Companies', date: '8 Aug, 2021' }
    ])

    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Featured Articles</div>
            <div className="sidebar-card-content">
                {articles.map((article, index) => (
                    <div key={index} className="home-article-card" >
                        <div className="home-article-card-left">{index > 9 ? `${index + 1}` : `0${index + 1}`}</div>
                        <div className="home-article-card-right">
                            <Link to="/" className="home-article-card-title">{article.title}</Link>
                            <div className="home-article-card-date">{article.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedArticles

