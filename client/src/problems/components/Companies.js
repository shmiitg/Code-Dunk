import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    function string_to_slug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-') // collapse dashes
            .replace(/^-+/, '') // trim - from start of text
            .replace(/-+$/, ''); // trim - from end of text
        return str;
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="sidebar-card">
            <div className="sidebar-card-heading">Companies</div>
            <div className="sidebar-card-content company-list">
                {companies.map((company, index) => (
                    <Link key={index} to={`/problems/company/${string_to_slug(company.name)}`} className="company-link" >
                        <span>{company.name}</span>
                        <span className="company-question-count">{company.questions}</span>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default Companies
