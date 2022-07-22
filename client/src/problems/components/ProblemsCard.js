import { Link } from "react-router-dom";
import styles from "./ProblemCard.module.css";

const ProblemsCard = ({ topic }) => {
    return (
        <Link to={`/problems/${topic.unique_link}`} className={styles["problem-card"]}>
            <div className={styles["problem-card-top"]}>
                <div className={styles["problem-topic"]}>{topic.title}</div>
                <div className={styles["problem-question-count"]}>
                    Total questions: <span>{topic.problems.length}</span>
                </div>
            </div>
            <div className={styles["problem-progress"]}>
                {topic.solved ? (
                    topic.solved === topic.problems.length ? (
                        "Completed"
                    ) : (
                        <div className={styles["bar"]}>
                            <div
                                style={{
                                    width: `${(topic.solved * 100) / topic.problems.length}%`,
                                }}
                                className={styles["current-bar"]}
                            ></div>
                        </div>
                    )
                ) : (
                    "Not started yet"
                )}
            </div>
        </Link>
    );
};

export default ProblemsCard;
