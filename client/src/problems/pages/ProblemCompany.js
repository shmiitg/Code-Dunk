import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReadMoreProblem from "../../components/ReadMoreProblem";
import { IoCaretBack } from "react-icons/io5";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const CompanyProblems = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { pathname } = useLocation();
    let company = pathname.split("/")[3];
    const [problems, setProblems] = useState([]);

    const fetchData = async () => {
        const res = await fetch(`/api/problems/company/${company}`);
        const data = await res.json();
        if (res.status === 200) {
            setProblems(data.problems);
        } else {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loading />;
    if (error) return <Error />;
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
                        <ReadMoreProblem
                            key={index}
                            title={problem.title}
                            statement={problem.statement}
                            difficulty={problem.difficulty}
                            link={`/problem/${problem.link}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyProblems;
