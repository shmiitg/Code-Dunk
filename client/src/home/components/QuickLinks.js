import React, { useState } from 'react';
import { FaEdit, FaCode, FaPython } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
    const [links, setLinks] = useState([
        { title: 'Write an Article', icon: <FaEdit />, address: '/blog/new' },
        { title: 'Data Structures Practice', icon: <FaCode />, address: '/problems/data-structures' },
        { title: 'Share Interview Experience', icon: <FaEdit />, address: '/interview/new' },
        { title: 'Python Tutorial', icon: <FaPython />, address: '/tutorial/python' }
    ])

    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Quick Links</div>
            <div className="sidebar-card-content">
                {links.map((link, index) => (
                    <Link key={index} to={link.address} className="home-link-card" >
                        <div className="home-link-card-left">{link.icon}</div>
                        <div className="home-link-card-right">
                            <div className="home-article-card-title">{link.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default QuickLinks
