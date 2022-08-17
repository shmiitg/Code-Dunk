import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import Loading from "../../loading/Loading";
import Compiler from "../components/Compiler";
import "../css/Problems.css";
import Error from "../../error/Error";
import styles from "../css/ProblemSolve.module.css";
import { UserContext } from "../../context/UserContext";
import parse from "html-react-parser";

const ProblemSolve = () => {
    const { pathname } = useLocation();
    const { userId } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [problem, setProblem] = useState({});
    const [upvote, setUpvote] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(0);

    const fetchData = async () => {
        const problemName = pathname.split("/")[2];
        const res = await fetch(`/api/problem/${problemName}`);
        const data = await res.json();
        if (res.status === 200) {
            setProblem({ ...data.problem });
            setUpvoteCount(data.problem.upvotes.length);
            if (data.problem.upvotes.includes(userId)) {
                setUpvote(true);
            }
        } else if (res.status === 404) {
            setError(true);
        } else {
            setError(true);
        }
        setLoading(false);
    };

    const upvoteProblem = async () => {
        const problemName = pathname.split("/")[2];
        const res = await fetch(`/api/problems/upvote/${problemName}`, {
            method: "PUT",
        });
        const data = await res.json();
        if (res.status === 200) {
            setUpvote(data.upvote);
            setUpvoteCount(data.upvoteCount);
        } else {
            window.alert(data.error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pathname]);

    if (loading) return <Loading />;
    if (error) return <Error />;
    return (
        <div className={styles["problem-container"]}>
            <div className={styles["fluid-container"]}>
                <div className="problem-container">
                    <div className="code-language"></div>
                    <div className="problem-card">
                        <div className={styles["problem-header"]}>
                            <div className="problem-title">{problem.title}</div>
                            <div className={styles["problem-info"]}>
                                <div className="problem-difficulty">{problem.difficulty}</div>
                                <div className={styles["problem-upvote"]} onClick={upvoteProblem}>
                                    {upvote ? (
                                        <svg viewBox="0 0 24 24" width="1em" height="1em">
                                            <path
                                                fillRule="evenodd"
                                                d="M7 21V9c0-.55.22-1.05.58-1.41L14.17 1l1.06 1.05c.27.27.44.65.44 1.06l-.03.32L14.69 8H21c1.1 0 2 .9 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H7zm-2 0H2V9h3v12z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="1em" height="1em">
                                            <path
                                                fillRule="evenodd"
                                                d="M7 19v-8H4v8h3zM7 9c0-.55.22-1.05.58-1.41L14.17 1l1.06 1.05c.27.27.44.65.44 1.06l-.03.32L14.69 8H21c1.1 0 2 .9 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3zm2 0v10h9l3-7v-2h-9l1.34-5.34L9 9z"
                                            ></path>
                                        </svg>
                                    )}
                                    {upvoteCount}
                                </div>
                            </div>
                        </div>
                        <div className="problem-content">{parse(problem.description)}</div>
                    </div>
                </div>
                <Compiler />
            </div>
        </div>
    );
};

export default ProblemSolve;
