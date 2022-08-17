import React, { useState, useEffect } from "react";
import ReadMoreProblem from "../../components/ReadMoreProblem";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import "../css/ProblemMostLiked.css";

const ProblemMostLiked = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [problems, setProblems] = useState([]);

    const fetchData = async () => {
        const res = await fetch(`/api/problems/most_liked/10`);
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
                <div className="problem-most-liked">10 Most Liked Problems</div>
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

export default ProblemMostLiked;
