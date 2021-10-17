import React from 'react';
import ProblemsMain from './components/ProblemsMain';
import QuickLinks from './components/QuickLinks';
import FeaturedArticles from './components/FeaturedArticles';
import './Home.css';

const Problems = () => {
    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <ProblemsMain />
                </div>
                <div className="sidebar">
                    <QuickLinks />
                    <FeaturedArticles />
                </div>
            </div>
        </div >
    )
}

export default Problems
