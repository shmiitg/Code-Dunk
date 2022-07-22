import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../loading/Loading";
import { IoCaretBack } from "react-icons/io5";
import Error from "../../error/Error";
import styles from "../css/ProblemList.module.css";

const ProblemList = () => {
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [topicName, setTopicName] = useState("");
    const [userProblems, setUserProblems] = useState(new Set());
    const { pathname } = useLocation();
    const topic = pathname.split("/")[2];

    const fetchData = async () => {
        const res = await fetch(`/api/problems/${topic}`);
        const userRes = await fetch("/user/info");
        const data = await res.json();
        const userData = await userRes.json();
        if (res.status === 200) {
            setTopicName(data.topic);
            setProblems(data.problems);
        }
        if (userRes.status === 200) {
            setUserProblems(new Set(userData.user.problems));
        }
        setLoading(false);
    };

    const editProblems = async (probs) => {
        const res = await fetch("/api/problems/user/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ problems: [...probs] }),
        });
        return res.status;
    };

    const handleCheck = async (id) => {
        let probs = userProblems;
        if (probs.has(id)) {
            probs.delete(id);
        } else {
            probs.add(id);
        }
        let editStatus = await editProblems(probs);
        if (editStatus === 200) {
            setUserProblems(probs);
            setProblems((prev) => prev.concat({}));
            setProblems((prev) => prev.slice(0, -1));
        } else {
            window.alert("Login to continue...");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loading />;
    if (problems.length === 0) return <Error />;
    return (
        <div className="container">
            <div className="container-lg">
                <div className={styles["problem-list-title"]}>{topicName} Problems</div>
                <div className="go-back">
                    <Link to="/problems">
                        <IoCaretBack />
                        Back to all topics
                    </Link>
                </div>
                <div className={styles["problems-table-container"]}>
                    <table className={styles["table"]}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Questions</th>
                                <th>Status</th>
                                <th>Done</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem, index) => (
                                <tr key={index} className={styles["cssbdr"]}>
                                    <td className={styles["problem-id"]}>{index + 1}</td>
                                    <td className={styles["problem-title"]}>
                                        <Link to={"/problem/" + problem.link}>{problem.title}</Link>
                                    </td>
                                    <td className={styles["problem-status"]}>
                                        {userProblems.has(problem._id) ? "Completed" : "Incomplete"}
                                    </td>
                                    <td className={styles["problem-checkbox"]}>
                                        <input
                                            onChange={() => handleCheck(problem._id)}
                                            type="checkbox"
                                            value={problem._id}
                                            checked={userProblems.has(problem._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProblemList;
