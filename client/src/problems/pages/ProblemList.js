import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../loading/Loading";
import { IoCaretBack } from "react-icons/io5";
import Error from "../../error/Error";
import styles from "../css/ProblemList.module.css";

const ProblemList = () => {
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [userProblems, setUserProblems] = useState([]);
    const { pathname } = useLocation();
    const topic = pathname.split("/")[2];

    const fetchData = async () => {
        const res = await fetch(`/api/problems/${topic}`);
        const userRes = await fetch("/user/info");
        const data = await res.json();
        const userData = await userRes.json();
        res.status === 200 && setProblems(data.problems);
        userRes.status === 200 && setUserProblems(userData.user.problems);
        setLoading(false);
    };

    const editProblems = async () => {
        const res = await fetch("/api/problems/user/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ problems: userProblems }),
        });
        res.status !== 200 && window.alert("Login to continue");
    };

    const handleCheck = (id) => {
        const idx = userProblems.indexOf(id);
        let probs = userProblems;
        idx === -1 ? probs.push(id) : probs.splice(idx, 1);
        setUserProblems(probs);
        editProblems();
    };

    function getTopic(topic) {
        topic = topic.replace("-", " ");
        let top = "";
        for (let i = 0; i < topic.length; i++) {
            if (i === 0) top += topic[i].toUpperCase();
            else if (topic[i - 1] === " ") top += topic[i].toUpperCase();
            else top += topic[i];
        }
        return top;
    }

    useEffect(() => {
        fetchData();
    }, [userProblems]);

    if (loading) return <Loading />;
    if (problems.length === 0) return <Error />;
    return (
        <div className="container">
            <div className="container-lg">
                <div className={styles["problem-list-title"]}>{getTopic(topic)} Problems</div>
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
                                        {userProblems.includes(problem._id)
                                            ? "Completed"
                                            : "Incomplete"}
                                    </td>
                                    <td className={styles["problem-checkbox"]}>
                                        <input
                                            onChange={() => handleCheck(problem._id)}
                                            type="checkbox"
                                            value={problem._id}
                                            checked={userProblems.includes(problem._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default ProblemList;
