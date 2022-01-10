import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/icon-company.svg';
import styles from './Companies.module.css';

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
        console.log(data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container">
            <div className={styles["company-container"]}>
                {companies.map((company, index) => (
                    <Link key={index} className={styles["company-card"]} to={`/problems/company/${company.name}`}>
                        <div className={styles["company-name"]}>{company.name}</div>
                        <div className={styles["company-problems"]}>{company.questions}</div>
                        <div className={styles["company-logo"]}>
                            <img src={logo} alt="icon" />
                        </div>
                    </Link>
                ))}
            </div >
        </div>
    )
}

export default Companies
