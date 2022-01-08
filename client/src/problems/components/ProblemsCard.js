import { Link } from 'react-router-dom';
import { slug } from '../../hooks and functions/Slug';
import styles from './ProblemCard.module.css';

const ProblemsCard = ({ problem }) => {
    return (
        <Link to={`/problems/${slug(problem.topic)}`} className={styles["problem-card"]}>
            <div className={styles["problem-card-top"]}>
                <div className={styles["problem-topic"]}>{problem.topic}</div>
                <div className={styles["problem-question-count"]}>Total questions: <span>{problem.questions.length}</span></div>
            </div>
            <div className={styles["problem-progress"]}>
                {problem.solved ? problem.solved === problem.questions.length ?
                    'Completed' :
                    <div className={styles["bar"]} >
                        <div style={{ width: `${problem.solved * 100 / problem.questions.length}%` }} className={styles["current-bar"]}></div>
                    </div>
                    : 'Not started yet'}
            </div>
        </Link>
    )
}

export default ProblemsCard
