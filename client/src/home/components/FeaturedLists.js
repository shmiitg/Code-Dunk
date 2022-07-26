import React from "react";
import { FaAmazon, FaGoogle } from "react-icons/fa";
import { SiAutoprefixer } from "react-icons/si";
import { Link } from "react-router-dom";

const FeaturedLists = () => {
    const links = [
        {
            title: "10 Most Liked Questions",
            icon: <SiAutoprefixer />,
            address: "/problems/most-liked",
        },
        { title: "Top Amazon Problems", icon: <FaAmazon />, address: "/problems/company/amazon" },
        { title: "Top Google Problems", icon: <FaGoogle />, address: "/problems/company/google" },
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
