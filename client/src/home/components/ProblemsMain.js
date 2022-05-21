import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import ReadMoreProblem from "../../components/ReadMoreProblem";

const ProblemsMain = () => {
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);

    const fetchData = async () => {
        const res = await fetch("/api/problems");
        const data = await res.json();
        if (res.status === 200 && data.problems.length >= 3) {
            setProblems([data.problems[0], data.problems[1], data.problems[2]]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // if (loading) return <Loading />;
    return (
        <div className="main-card">
            {problems.map((problem, index) => (
                <ReadMoreProblem
                    key={index}
                    title={problem.title}
                    difficulty=""
                    description={problem.description}
                    link={`/problem/${problem.link}`}
                />
            ))}
        </div>
    );
};

export default ProblemsMain;
