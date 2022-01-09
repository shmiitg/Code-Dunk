import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReadMoreProblem from '../../components/ReadMoreProblem';
import { IoCaretBack } from 'react-icons/io5';

const CompanyProblems = () => {
    const { pathname } = useLocation();
    let company = pathname.split('/')[3];
    company = company[0].toUpperCase() + company.substring(1);
    const [problems, setProblems] = useState([]);

    const fetchData = async () => {
        const res = await fetch(`/api/problems/company/${company}`);
        const data = await res.json();
        if (res.status === 200) {
            setProblems(data.problems);
        } else {
            window.alert(data.error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container">
            <div className="container-lg">
                <div className="go-back">
                    <Link to="/companies">
                        <IoCaretBack />
                        Back to all Companies
                    </Link>
                </div>
                <div className="problems-list">
                    {problems.map((problem, index) => (
                        <ReadMoreProblem key={index} title={problem.title} description={problem.description} difficulty={problem.difficulty} link={`/problem/${problem.link}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompanyProblems
