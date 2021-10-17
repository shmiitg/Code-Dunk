import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAmazon, FaGem } from 'react-icons/fa';
import { SiAutoprefixer } from 'react-icons/si';

const FeaturedList = () => {
    const [featuredList, setFeaturedList] = useState([
        { link: '/', logo: <FaGem />, title: 'Top 100 Liked Questions' },
        { link: '/', logo: <FaAmazon />, title: 'Top Amazon Questions' },
        { link: '/', logo: <SiAutoprefixer />, title: 'Top Alogorithm Questions' }
    ])

    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Featured List</div>
            <div className="sidebar-card-content">
                {featuredList.map((flist, index) => (
                    <Link key={index} to={flist.link} className="featured-list-card" >
                        <div className="featured-list-card-left">{flist.logo}</div>
                        <div className="featured-list-card-right">
                            <div className="featured-list-card-title">{flist.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FeaturedList
