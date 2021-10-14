import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAmazon, FaGem } from 'react-icons/fa';
import { SiAutoprefixer } from 'react-icons/si';
import './Problems.css';

const Problems = () => {

    const [problems, setProblems] = useState([
        {
            title: 'Linked Lists',
            questions: [
                'QuickSort on Singly Linked List',
                'QuickSort on Doubly Linked List'
            ]
        }, {
            title: 'Sorting and Searching',
            questions: [
                'Interpolation search vs Binary search',
                'Stability in sorting algorithms',
                'Lower bound for comparison based sorting algorithms',
                'QuickSort on Singly Linked List',
                'QuickSort on Doubly Linked List'
            ]
        }, {
            title: 'Dynamic Programming',
            questions: [
                'Minimum number of jumps to reach end',
                'Maximum size square sub - matrix with all 1s',
                'Ugly Numbers',
                'Largest Sum Contiguous Subarray',
                'Longest Palindromic Substring',
                'Bellman–Ford Algorithm for Shortest Paths',
                'Optimal Binary Search Tree',
                'Largest Independent Set Problem',
                'Subset Sum Problem',
                'Maximum sum rectangle in a 2D matrix',
                'Count number of binary strings without consecutive 1 s',
                'Boolean Parenthesization Problem',
                'Count ways to reach the n’th stair',
                'Minimum Cost Polygon Triangulation',
                'Mobile Numeric Keypad Problem',
                'Count of n digit numbers whose sum of digits equals to given sum',
                'Minimum Initial Points to Reach Destination',
                'Total number of non- decreasing numbers with n digits',
                'Find length of the longest consecutive path from a given starting character'
            ]
        }
    ])

    const [companies, setCompanies] = useState(['Google', 'Facebook', 'Rubrik', 'Amazon',
        'JP Morgan', 'Apple', 'Goldman Sachs', 'Uber', 'Microsoft', 'Oracle', 'Yahoo', 'Walmart', 'Cisco', 'Twitter']);

    return (
        <div className="container">
            <div className="small-container">
                <div className="main">
                    <div className="main-card">
                        {problems.map((problem, index) => (
                            <div key={index} className="problems-card">
                                <div className="problems-title">{problem.title}</div>
                                <ul className="problems-list">
                                    {problem.questions.map((p, idx) => (
                                        <li key={idx}>{idx + 1}. <Link to="/">{p}</Link></li>
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
                            {companies.map(company => (
                                <Link to="/company" className="company-name" >{company}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="sidebar-card">
                        <div className="sidebar-card-heading">Featured List</div>
                        <div className="sidebar-card-content">
                            <Link to="/" className="featured-list-card" >
                                <div className="featured-list-card-left"><FaGem /></div>
                                <div className="featured-list-card-right">
                                    <div className="featured-list-card-title">Top 100 Liked Questions</div>
                                </div>
                            </Link>
                            <Link to="/" className="featured-list-card" >
                                <div className="featured-list-card-left"><FaAmazon /></div>
                                <div className="featured-list-card-right">
                                    <div className="featured-list-card-title">Top Amazon Questions</div>
                                </div>
                            </Link>
                            <Link to="/" className="featured-list-card" >
                                <div className="featured-list-card-left"><SiAutoprefixer /></div>
                                <div className="featured-list-card-right">
                                    <div className="featured-list-card-title">Top Alogorithm Questions</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Problems
