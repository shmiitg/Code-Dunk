import React from 'react';
import ProblemsList from './components/ProblemsList';
import Companies from './components/Companies';
import FeaturedList from './components/FeaturedList';
import './Problems.css';

const Problems = () => {
    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <ProblemsList />
                </div>
                <div className="sidebar">
                    <Companies />
                    <FeaturedList />
                </div>
            </div>
        </div >
    )
}

export default Problems
