import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiArticleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
    const links = [
        { title: 'Write an Article', icon: <RiArticleFill />, address: '/blog/new' },
        { title: 'Share Interview Experience', icon: <FaEdit />, address: '/interview/new' },
    ]

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
