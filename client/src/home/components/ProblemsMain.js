import React, { useState, useEffect } from "react";
import ProblemsLoading from "../../loading/ProblemLoading";
import ReadMoreProblem from "../../components/ReadMoreProblem";

const ProblemsMain = () => {
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);

    const fetchData = async () => {
        const problemsCount = 4;
        //get 3 random problems
        const res = await fetch(`/api/problems/random/${problemsCount}`);
        const data = await res.json();
        if (res.status === 200) {
            setProblems(data.problems);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="main-card">
            {loading && [1, 2, 3, 4].map((n) => <ProblemsLoading key={n} />)}
            {!loading &&
                problems.map((problem, index) => (
                    <ReadMoreProblem
                        key={index}
                        title={problem.title}
                        difficulty=""
                        statement={problem.statement}
                        link={`/problem/${problem.link}`}
                    />
                ))}
        </div>
    );
};

export default ProblemsMain;
