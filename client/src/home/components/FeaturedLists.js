import React from "react";
import { FaEdit } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const FeaturedLists = () => {
    const links = [
        { title: "100 Most Liked Questions", icon: <RiArticleFill />, address: "/" },
        { title: "Top Amazon Problems", icon: <FaEdit />, address: "/problems/company/amazon" },
        { title: "Top Facebook Problems", icon: <FaEdit />, address: "/problems/company/amazon" },
    ];

    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Featured Lists</div>
            <div className="sidebar-card-content">
                {links.map((link, index) => (
                    <Link key={index} to={link.address} className="home-link-card">
                        <div className="home-link-card-left">{link.icon}</div>
                        <div className="home-link-card-right">
                            <div className="home-article-card-title">{link.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedLists;
