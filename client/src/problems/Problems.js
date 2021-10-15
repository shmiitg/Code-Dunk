import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAmazon, FaGem } from 'react-icons/fa';
import { SiAutoprefixer } from 'react-icons/si';
import './Problems.css';

const Problems = () => {
    const [problems, setProblems] = useState([]);

    const [companies, setCompanies] = useState(['Google', 'Facebook', 'Rubrik', 'Amazon',
        'JP Morgan', 'Apple', 'Goldman Sachs', 'Uber', 'Microsoft', 'Oracle', 'Yahoo', 'Walmart', 'Cisco', 'Twitter']);

    const [featuredList, setFeaturedList] = useState([
        { link: '/', logo: <FaGem />, title: 'Top 100 Liked Questions' },
        { link: '/', logo: <FaAmazon />, title: 'Top Amazon Questions' },
        { link: '/', logo: <SiAutoprefixer />, title: 'Top Alogorithm Questions' }
    ])

    const fetchData = async () => {
        const res = await fetch('/api/problems');
        const data = await res.json();
        if (res.status === 200) {
            const probs = [];
            data.problems.forEach(problem => {
                const idx = probs.map(obj => obj.topic).indexOf(problem.topic);
                if (idx === -1) {
                    probs.push({ topic: problem.topic, questions: [problem.title] })
                }
                else {
                    probs[idx].questions.push(problem.title);
                }
            })
            setProblems(probs);
        } else {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <div className="main-card">
                        {problems.map((problem, index) => (
                            <div key={index} className="problems-card">
                                <div className="problems-title">{problem.topic}</div>
                                <ul className="problems-list">
                                    {problem.questions.map((p, idx) => (
                                        <li key={idx}>{idx + 1}. <Link to={'/problem/' + p[0].toLowerCase() + p.substr(1).replace(/\s+/g, '-')}>{p}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="sidebar">
                    <div className="sidebar-card">
                        <div className="sidebar-card-heading">Companies</div>
                        <div className="sidebar-card-content company-list">
                            {companies.map((company, index) => (
                                <Link key={index} to="/company" className="company-name" >{company}</Link>
                            ))}
                        </div>
                    </div>
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
                </div>
            </div>
        </div >
    )
}

export default Problems
