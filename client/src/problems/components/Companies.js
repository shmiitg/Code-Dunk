import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { slug } from '../../hooks and functions/Slug';

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    const fetchData = async () => {
        const res = await fetch('/api/companies');
        const data = await res.json();
        if (res.status === 200) {
            let companiesMap = [];
            data.companies.forEach(company => {
                const idx = companiesMap.map(e => e.name).indexOf(company);
                if (idx === -1) {
                    companiesMap.push({ name: company, questions: 1 })
                } else {
                    companiesMap[idx].questions += 1;
                }
            })
            companiesMap = companiesMap.sort((a, b) => b.questions - a.questions)
            setCompanies(companiesMap);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Companies</div>
            <div className="sidebar-card-content company-list">
                {companies.map((company, index) => (
                    <Link key={index} to={`/problems/company/${slug(company.name)}`} className="company-link" >
                        <span>{company.name}</span>
                        <span className="company-question-count">{company.questions}</span>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default Companies
