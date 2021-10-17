import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Companies = () => {
    const [companies, setCompanies] = useState(['Google', 'Facebook', 'Rubrik', 'Amazon',
        'JP Morgan', 'Apple', 'Goldman Sachs', 'Uber', 'Microsoft', 'Oracle', 'Yahoo', 'Walmart', 'Cisco', 'Twitter']);

    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Companies</div>
            <div className="sidebar-card-content company-list">
                {companies.map((company, index) => (
                    <Link key={index} to="/company" className="company-name" >{company}</Link>
                ))}
            </div>
        </div>
    )
}

export default Companies
