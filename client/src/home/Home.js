import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaCode, FaPython } from 'react-icons/fa';

import './Home.css';

const Problems = () => {
    const [problems, setProblems] = useState([
        {
            title: 'Check if all elements of given Linked List corresponds to a downward path from any node in given Binary Tree',
            statement: 'Find permutation of numbers upto N with a specific sum in a specific range',
            id: 1
        },
        {
            title: 'Find permutation of numbers upto N with a specific sum in a specific range',
            statement: 'Find permutation of numbers upto N with a specific sum in a specific range',
            id: 2
        },
        {
            title: 'System Design',
            statement: 'Find permutation of numbers upto N with a specific sum in a specific range',
            id: 3
        },
    ])
    const [articles, setArticles] = useState([
        { title: 'Master the Coding Interview – Contest Series Based On Real Interviews', id: 1, date: '8 Aug, 2021' },
        { title: 'Must Do Coding Questions for Product Based Companies', id: 2, date: '8 Aug, 2021' },
        { title: 'Recently Asked Interview Questions in Product Based Companies', id: 3, date: '8 Aug, 2021' }
    ])

    const [links, setLinks] = useState([
        { title: 'Write an Article', id: 1, icon: <FaEdit />, address: '/blog/new' },
        { title: 'Data Structures Practice', id: 2, icon: <FaCode />, address: '/problems/data-structures' },
        { title: 'Share Interview Experience', id: 3, icon: <FaEdit />, address: '/interview/new' },
        { title: 'Python Tutorial', id: 4, icon: <FaPython />, address: '/tutorial/python' }
    ])

    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <div className="main-card">
                        {problems.map(problem => (
                            <div className="home-problem-card">
                                <Link to="/"><div className="home-problem-title">{problem.title}</div></Link>
                                <div className="home-problem-statement">{problem.statement}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="sidebar">
                    <div className="sidebar-card">
                        <div className="sidebar-card-heading">Quick Links</div>
                        <div className="sidebar-card-content">
                            {links.map(link => (
                                <Link to={link.address} className="home-link-card" >
                                    <div className="home-link-card-left">{link.icon}</div>
                                    <div className="home-link-card-right">
                                        <div className="home-article-card-title">{link.title}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="sidebar-card">
                        <div className="sidebar-card-heading">Featured Articles</div>
                        <div className="sidebar-card-content">
                            {articles.map((article, index) => (
                                <div className="home-article-card" >
                                    <div className="home-article-card-left">{index > 9 ? `${index + 1}` : `0${index + 1}`}</div>
                                    <div className="home-article-card-right">
                                        <Link to="/" className="home-article-card-title">{article.title}</Link>
                                        <div className="home-article-card-date">{article.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Problems
